import gsap from 'gsap';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './button-list.scss';

type ButtonListProps = {
  buttons: {
    label: string;
    onClick: () => void;
  }[];
  buttonContainerStyle?: React.CSSProperties;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

export default function ButtonList({
  buttons,
  buttonContainerStyle = {},
  activeIndex,
  onActiveChange,
}: ButtonListProps) {
  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const hasMountedRef = useRef(false);

  // States
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Common
  const scrollActiveIntoView = useCallback((index: number, smooth: boolean) => {
    const nav = navRef.current;
    const item = itemRefs.current[index];

    if (!nav || !item) {
      return;
    }

    const targetLeft =
      item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2;

    nav.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Scroll button handlers
  const updateScrollAffordance = useCallback(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = nav;
    const hasOverflow = scrollWidth > clientWidth + 1;

    setCanScrollLeft(hasOverflow && scrollLeft > 1);
    setCanScrollRight(
      hasOverflow && scrollLeft < scrollWidth - clientWidth - 1
    );
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }

    const resizeObserver = new ResizeObserver(updateScrollAffordance);
    resizeObserver.observe(nav);

    nav.addEventListener('scroll', updateScrollAffordance, { passive: true });

    return () => {
      resizeObserver.disconnect();
      nav.removeEventListener('scroll', updateScrollAffordance);
    };
  }, [buttons.length, updateScrollAffordance]);

  useEffect(() => {
    const handleResize = () => {
      const index = activeIndex ?? 0;
      scrollActiveIntoView(index, false);
      updateScrollAffordance();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, scrollActiveIntoView, updateScrollAffordance]);

  // Indicator handlers
  const moveIndicator = useCallback((index: number, immediate = false) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const item = itemRefs.current[index];

    if (!nav || !indicator || !item) {
      return;
    }

    const x = item.offsetLeft;
    const y = item.offsetTop;
    const width = item.offsetWidth;
    const height = item.offsetHeight;

    tweenRef.current?.kill();

    if (immediate) {
      gsap.set(indicator, { x, y, width, height });
      return;
    }

    tweenRef.current = gsap.to(indicator, {
      x,
      y,
      width,
      height: height - 1,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  const handleClick = (index: number, onClick: () => void) => {
    onActiveChange?.(index);
    onClick();
  };

  useLayoutEffect(() => {
    const index = activeIndex ?? 0;
    const isFirstPaint = !hasMountedRef.current;
    moveIndicator(index, isFirstPaint);
    scrollActiveIntoView(index, !isFirstPaint);
    hasMountedRef.current = true;
    requestAnimationFrame(updateScrollAffordance);
  }, [
    activeIndex,
    moveIndicator,
    scrollActiveIntoView,
    updateScrollAffordance,
  ]);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <div className="button-list-wrapper">
      {canScrollLeft && (
        <button
          type="button"
          className="button-list-scroll"
          aria-label="Scroll options left"
          onClick={() => {
            const index = Math.max(0, (activeIndex ?? 0) - 1);
            handleClick(index, buttons[index].onClick);
          }}
        >
          <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        </button>
      )}
      <div
        ref={navRef}
        className="button-list"
        aria-label="Options"
        style={buttonContainerStyle}
      >
        <span
          ref={indicatorRef}
          className="button-list-indicator"
          aria-hidden="true"
        />
        {buttons.map((button, index) => {
          const isHighlighted = index === activeIndex;
          const isActive = index === activeIndex;

          return (
            <button
              key={button.label}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              type="button"
              className={`button-list-item ${isHighlighted ? 'is-highlighted' : ''}`}
              onClick={() => handleClick(index, button.onClick)}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="button-list-label">{button.label}</span>
            </button>
          );
        })}
      </div>
      {canScrollRight && (
        <button
          type="button"
          className="button-list-scroll"
          aria-label="Scroll options right"
          onClick={() => {
            const index = Math.min(buttons.length - 1, (activeIndex ?? 0) + 1);
            console.log(index, activeIndex, buttons.length);
            handleClick(index, buttons[index].onClick);
          }}
        >
          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
