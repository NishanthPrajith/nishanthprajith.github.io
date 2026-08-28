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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const highlightedIndex = hoveredIndex ?? activeIndex;

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
      height,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  const scrollActiveIntoView = useCallback((index: number, smooth: boolean) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      inline: 'center',
      block: 'nearest',
    });
  }, []);

  const handleClick = (index: number, onClick: () => void) => {
    onActiveChange?.(index);
    onClick();
  };

  useLayoutEffect(() => {
    const index = highlightedIndex ?? 0;
    const isFirstPaint = !hasMountedRef.current;

    moveIndicator(index, isFirstPaint);
    scrollActiveIntoView(index, !isFirstPaint);
    hasMountedRef.current = true;
  }, [highlightedIndex, moveIndicator, scrollActiveIntoView]);

  useEffect(() => {
    const handleResize = () => {
      const index = highlightedIndex ?? 0;
      moveIndicator(index, true);
      scrollActiveIntoView(index, false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [highlightedIndex, moveIndicator, scrollActiveIntoView]);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="button-list"
      aria-label="Options"
      onMouseLeave={() => setHoveredIndex(null)}
      style={buttonContainerStyle}
    >
      <span
        ref={indicatorRef}
        className="button-list-indicator"
        aria-hidden="true"
      />
      {buttons.map((button, index) => {
        const isHighlighted = index === highlightedIndex;
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
            onMouseEnter={() => setHoveredIndex(index)}
            aria-current={isActive ? 'true' : undefined}
          >
            <span className="button-list-label">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
}
