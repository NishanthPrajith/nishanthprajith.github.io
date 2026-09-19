import './scroll-indicator.scss';

import { RefObject, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ScrollIndicatorProps = {
  variant?: 'main' | 'bottom-sheet';
  scrollContainerRef?: RefObject<HTMLElement | null>;
};

export default function ScrollIndicator({
  variant = 'main',
  scrollContainerRef,
}: ScrollIndicatorProps) {
  const thumbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const thumb = thumbRef.current;
    const container = scrollContainerRef?.current ?? null;

    if (!thumb) {
      return;
    }

    const update = () => {
      // Main page scroll is locked while the bottom sheet is open; ignore window
      // updates until it closes (thumb stays at the last value).
      if (!container && document.body.classList.contains('bottom-sheet-open')) {
        return;
      }

      const maxScroll = container
        ? container.scrollHeight - container.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const position = container ? container.scrollTop : window.scrollY;
      const progress = maxScroll > 0 ? position / maxScroll : 0;

      thumb.style.height = `${Math.min(100, Math.max(0, progress * 100))}%`;
    };

    update();

    const scrollTarget = container ?? window;
    scrollTarget.addEventListener('scroll', update, { passive: true });

    if (!container) {
      window.addEventListener('resize', update);
    }

    return () => {
      scrollTarget.removeEventListener('scroll', update);
      if (!container) {
        window.removeEventListener('resize', update);
      }
    };
  }, [scrollContainerRef]);

  const node = (
    <div className="scroll-indicator" data-variant={variant}>
      <div className="scroll-indicator-track">
        <div className="scroll-indicator-track-thumb" ref={thumbRef} />
      </div>
    </div>
  );

  return variant === 'main' ? createPortal(node, document.body) : node;
}
