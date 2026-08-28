import './gallery-preview.scss';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ViewerSelection } from '../../../../../../data/gallery/types';

// Constants
const VIEWER_EASE = 'power3.inOut';
const VIEWER_DURATION = 0.62;

// Helper functions
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTargetRect(aspectRatio: number) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const horizontalPadding = viewportWidth < 768 ? 20 : 32;
  const captionSpace = 52;
  const maxWidth = Math.min(
    aspectRatio >= 1 ? 1500 : 1000,
    viewportWidth - horizontalPadding * 2
  );
  const maxHeight =
    viewportHeight * 0.75 - horizontalPadding * 2 - captionSpace;

  let width = maxWidth;
  let height = width / aspectRatio;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  return {
    width,
    height,
    left: (viewportWidth - width) / 2,
    top: clamp(
      (viewportHeight - height - captionSpace) / 2,
      horizontalPadding,
      viewportHeight - height - captionSpace - horizontalPadding
    ),
    borderRadius: '1.5rem',
  };
}

function getSourceRect(
  sourceElement: HTMLElement,
  fallbackRect: DOMRect
): DOMRect {
  if (sourceElement.isConnected) {
    return sourceElement.getBoundingClientRect();
  }

  return fallbackRect;
}

async function waitForImage(img: HTMLImageElement) {
  if (img.complete && img.naturalWidth > 0) {
    try {
      await img.decode();
    } catch {
      // Decoding failed, but the image is still usable.
    }
    return;
  }

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Image failed to load'));
  });

  try {
    await img.decode();
  } catch {
    // Decoding failed, but the image is still usable.
  }
}

export function GalleryPreview({
  selection,
  onClose,
  onImageReady,
}: {
  selection: ViewerSelection;
  onClose: () => void;
  onImageReady?: () => void;
}) {
  const { item, sourceRect, sourceElement, aspectRatio } = selection;
  const previewSrc = item.thumbnail ?? item.image;

  // Refs
  const scrimRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const fullImageRef = useRef<HTMLImageElement | null>(null);

  // States
  const [showCaption, setShowCaption] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Full resolution image upgrade
  const upgradeToFullRes = useCallback(async () => {
    if (!item.thumbnail || item.thumbnail === item.image || !imgRef.current) {
      return;
    }

    if (!fullImageRef.current) {
      const fullImage = new Image();
      fullImage.src = item.image;
      fullImageRef.current = fullImage;
    }

    const fullImage = fullImageRef.current;

    if (!fullImage.complete) {
      await new Promise<void>((resolve) => {
        fullImage.onload = () => resolve();
        fullImage.onerror = () => resolve();
      });
    }

    try {
      await fullImage.decode();
    } catch {
      // Fall back to swapping even if decode fails.
    }

    if (imgRef.current) {
      imgRef.current.src = item.image;
    }
  }, [item.image, item.thumbnail]);

  const runCloseAnimation = useCallback(() => {
    if (isClosing || !cardRef.current || !scrimRef.current) {
      return;
    }

    const closeTargetRect = getSourceRect(sourceElement, sourceRect);

    setIsClosing(true);
    setShowCaption(false);

    timelineRef.current?.kill();
    timelineRef.current = gsap.timeline({ onComplete: onClose });

    timelineRef.current.to(
      scrimRef.current,
      { opacity: 0, duration: 0.34, ease: 'power2.inOut' },
      0
    );

    timelineRef.current.to(
      cardRef.current,
      {
        top: closeTargetRect.top,
        left: closeTargetRect.left,
        width: closeTargetRect.width,
        height: closeTargetRect.height,
        borderRadius: 'var(--border-radius)',
        duration: 0.48,
        ease: 'power3.inOut',
      },
      0
    );
  }, [isClosing, onClose, sourceElement, sourceRect]);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const scrim = scrimRef.current;
    const img = imgRef.current;

    if (!card || !scrim || !img) {
      return;
    }

    let isActive = true;

    const runOpenAnimation = () => {
      if (!isActive) {
        return;
      }

      const openSourceRect = getSourceRect(sourceElement, sourceRect);
      const targetRect = getTargetRect(aspectRatio);

      gsap.set(card, {
        position: 'fixed',
        top: openSourceRect.top,
        left: openSourceRect.left,
        width: openSourceRect.width,
        height: openSourceRect.height,
        borderRadius: targetRect.borderRadius,
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: 'center center',
      });

      gsap.set(scrim, { opacity: 0 });
      setShowCaption(false);
      setIsVisible(true);
      onImageReady?.();

      timelineRef.current?.kill();
      timelineRef.current = gsap.timeline();

      timelineRef.current.to(
        scrim,
        { opacity: 1, duration: 0.42, ease: 'power2.out' },
        0
      );

      timelineRef.current.to(
        card,
        {
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: targetRect.borderRadius,
          duration: VIEWER_DURATION,
          ease: VIEWER_EASE,
          onComplete: () => {
            if (!isActive) {
              return;
            }

            void upgradeToFullRes();
            setShowCaption(true);
          },
        },
        0
      );
    };

    setIsVisible(false);

    void waitForImage(img)
      .then(() => {
        if (isActive) {
          runOpenAnimation();
        }
      })
      .catch(() => {
        if (isActive) {
          runOpenAnimation();
        }
      });

    return () => {
      isActive = false;
      timelineRef.current?.kill();
    };
  }, [aspectRatio, onImageReady, sourceElement, sourceRect, upgradeToFullRes]);

  useEffect(() => {
    fullImageRef.current = null;

    if (!item.thumbnail || item.thumbnail === item.image) {
      return;
    }

    const fullImage = new Image();
    fullImage.src = item.image;
    fullImageRef.current = fullImage;

    return () => {
      fullImageRef.current = null;
    };
  }, [item.image, item.thumbnail]);

  useEffect(() => {
    document.body.classList.add('gallery-viewer-open');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        runCloseAnimation();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.body.classList.remove('gallery-viewer-open');
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [runCloseAnimation]);

  return createPortal(
    <div
      className="gallery-viewer"
      data-visible={isVisible ? 'true' : undefined}
      role="dialog"
      aria-modal="true"
    >
      <button
        ref={scrimRef}
        type="button"
        className="gallery-viewer-scrim"
        aria-label="Close gallery viewer"
        onClick={runCloseAnimation}
      />

      <div className="gallery-viewer-stage">
        <div ref={cardRef} className="gallery-viewer-card">
          <div className="gallery-viewer-media">
            <img
              ref={imgRef}
              src={previewSrc}
              alt={item.title ?? ''}
              decoding="sync"
              fetchPriority="high"
            />
          </div>

          <motion.div
            className="gallery-viewer-caption"
            initial={false}
            animate={
              showCaption && !isClosing
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 10, filter: 'blur(4px)' }
            }
            transition={{
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="gallery-viewer-title">{item.title ?? item.group}</p>
          </motion.div>
        </div>
      </div>
    </div>,
    document.body
  );
}
