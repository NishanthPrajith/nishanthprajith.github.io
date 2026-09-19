import './carousel.scss';

import CarouselCard from '../carousel-card/carousel-card';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CarouselCardItem, ViewerSelection } from '../../../../data/types';
import { groupGalleryCarouselStacks } from '../../../../utils/group-gallery-carousel-stacks';

const DEFAULT_STACK_GAP_PX = 20;

function parseGapPx(gapValue: string) {
  const gapPx = Number.parseFloat(gapValue.split(' ')[0] ?? '');
  return Number.isNaN(gapPx) ? DEFAULT_STACK_GAP_PX : gapPx;
}

type Props = {
  items: CarouselCardItem[];
  variant?: 'project' | 'photo-gallery';
  style?: React.CSSProperties;
  onItemClick?: (item: CarouselCardItem) => void;
  onViewerSelect?: (selection: ViewerSelection) => void;
};

export default function Carousel({
  items,
  variant = 'project',
  style = {},
  onItemClick,
  onViewerSelect,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsKey = items.map((item) => item.id).join('|');
  const [itemStacks, setItemStacks] = useState<CarouselCardItem[][]>(() =>
    items.map((item) => [item])
  );

  useLayoutEffect(() => {
    if (variant !== 'photo-gallery') {
      setItemStacks(items.map((item) => [item]));
      return;
    }

    const track = trackRef.current;
    const gap = track
      ? parseGapPx(getComputedStyle(track).gap)
      : DEFAULT_STACK_GAP_PX;

    setItemStacks(groupGalleryCarouselStacks(items, gap));
  }, [items, itemsKey, variant]);

  useEffect(() => {
    const track = trackRef.current;
    track?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [itemsKey, variant]);

  useEffect(() => {
    const track = trackRef.current;
    const firstItem = track?.querySelector('.carousel-item');

    if (firstItem && track) {
      track.style.paddingInline = `calc(50dvw - ${firstItem.getBoundingClientRect().width / 2}px)`;
    }
  }, [itemsKey, variant, itemStacks]);

  return (
    <section className="carousel-section" style={style}>
      <div className="carousel">
        <div
          ref={trackRef}
          className="carousel-track"
          role="button"
          tabIndex={0}
          data-variant={variant}
          style={
            variant === 'photo-gallery'
              ? {
                  alignItems: 'flex-end',
                }
              : {}
          }
        >
          {itemStacks.map((stack) => (
            <div
              key={stack.map((item) => item.id).join('-')}
              className={
                stack.length > 1
                  ? 'carousel-item carousel-item-stack'
                  : 'carousel-item'
              }
            >
              {stack.map((item) => (
                <CarouselCard
                  key={item.id}
                  item={item}
                  variant={variant}
                  onItemClick={onItemClick}
                  onViewerSelect={onViewerSelect}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
