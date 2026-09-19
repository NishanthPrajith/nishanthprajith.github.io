import './scroll-indicator.scss';

import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ScrollIndicatorProps = {
  variant?: 'main' | 'bottom-sheet';
  scrollContainer?: HTMLElement | null;
};

export default function ScrollIndicator({
  variant = 'main',
  scrollContainer,
}: ScrollIndicatorProps) {
  const thumbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) {
      return;
    }

    if (variant === 'bottom-sheet' && !scrollContainer) {
      return;
    }

    const container = variant === 'bottom-sheet' ? scrollContainer : null;

    const update = () => {
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

    const scrollTarget: EventTarget = container ?? window;
    scrollTarget.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const resizeObserver =
      container && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(update)
        : null;
    if (container) {
      resizeObserver?.observe(container);
    }

    return () => {
      scrollTarget.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      resizeObserver?.disconnect();
    };
  }, [variant, scrollContainer]);

  const node = (
    <div className="scroll-indicator" data-variant={variant}>
      <div className="scroll-indicator-track">
        <div className="scroll-indicator-track-thumb" ref={thumbRef} />
      </div>
    </div>
  );

  return variant === 'main' ? createPortal(node, document.body) : node;
}
