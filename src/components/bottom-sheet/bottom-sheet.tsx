import './bottom-sheet.scss';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  header?: ReactNode;
  ariaLabel?: string;
  scaleTargetSelector?: string;
  className?: string;
  contentClassName?: string;
};

export function useBottomSheet(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    setIsOpen,
  };
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  header,
  ariaLabel = 'Bottom sheet',
  scaleTargetSelector = '.App',
  className,
  contentClassName,
}: BottomSheetProps) {
  // Refs
  const backdropRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scaleTargetRef = useRef<HTMLElement | null>(null);

  // Function to run the close animation
  const runCloseAnimation = useCallback(() => {
    if (!backdropRef.current || !sheetRef.current) {
      onClose();
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = gsap.timeline({ onComplete: onClose });

    timelineRef.current.to(
      backdropRef.current,
      { opacity: 0, duration: 0.34, ease: 'power2.inOut' },
      0
    );

    timelineRef.current.to(
      sheetRef.current,
      { y: '100%', duration: 0.52, ease: 'power3.inOut' },
      0
    );

    if (scaleTargetRef.current) {
      timelineRef.current.to(
        scaleTargetRef.current,
        {
          scale: 1,
          borderRadius: '0px',
          duration: 0.52,
          ease: 'power3.inOut',
        },
        0
      );
    }
  }, [onClose]);

  // Function to run the open animation
  useLayoutEffect(() => {
    if (!isOpen || !backdropRef.current || !sheetRef.current) {
      return;
    }

    scaleTargetRef.current = document.querySelector(
      scaleTargetSelector
    ) as HTMLElement | null;

    const backdrop = backdropRef.current;
    const sheet = sheetRef.current;
    const scaleTarget = scaleTargetRef.current;

    gsap.set(backdrop, { opacity: 0 });
    gsap.set(sheet, { y: '100%' });

    if (scaleTarget) {
      gsap.set(scaleTarget, { scale: 1, borderRadius: 0, overflow: 'hidden' });
    }

    timelineRef.current?.kill();
    timelineRef.current = gsap.timeline();

    timelineRef.current.to(
      backdrop,
      { opacity: 1, duration: 0.42, ease: 'power2.out' },
      0
    );

    timelineRef.current.to(
      sheet,
      { y: '0%', duration: 0.68, ease: 'power3.out' },
      0
    );

    if (scaleTarget) {
      timelineRef.current.to(
        scaleTarget,
        {
          scale: 0.97,
          borderRadius: 24,
          duration: 0.68,
          ease: 'power3.out',
        },
        0
      );
    }

    return () => {
      timelineRef.current?.kill();
      if (scaleTarget) {
        gsap.set(scaleTarget, { clearProps: 'scale,borderRadius,overflow' });
      }
    };
  }, [isOpen, scaleTargetSelector]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.classList.add('bottom-sheet-open');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (document.body.classList.contains('gallery-viewer-open')) {
          return;
        }
        runCloseAnimation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('bottom-sheet-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, runCloseAnimation]);

  if (!isOpen) {
    return null;
  }

  const sheetClassName = ['bottom-sheet', className].filter(Boolean).join(' ');
  const scrollClassName = ['bottom-sheet-scroll', contentClassName]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div className="bottom-sheet-portal" role="dialog" aria-modal="true">
      {/* Empty Space Close Button */}
      <button
        ref={backdropRef}
        type="button"
        className="bottom-sheet-backdrop"
        aria-label={`Close ${ariaLabel}`}
        onClick={runCloseAnimation}
        onDrag={runCloseAnimation}
      />

      <div ref={sheetRef} className={sheetClassName}>
        {/* Close Buttons */}
        <button
          type="button"
          className="bottom-sheet-mobile-handle"
          aria-label="Dismiss sheet"
          onClick={runCloseAnimation}
        />
        {/* End Close Buttons */}

        <div className={scrollClassName}>
          {header ??
            (title || subtitle ? (
              <motion.header
                className="bottom-sheet-header"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {title && <p className="bottom-sheet-title">{title}</p>}
                {subtitle && (
                  <p className="bottom-sheet-subtitle">{subtitle}</p>
                )}
              </motion.header>
            ) : null)}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
