import './gallery-tile.scss';

import { memo, useEffect, useRef, useState } from 'react';
import {
  GalleryItem,
  ViewerSelection,
} from '../../../../../../data/gallery/types';

function getImageAspectRatio(
  item: GalleryItem,
  fallbackAspectRatio: number,
  image?: HTMLImageElement | null
) {
  if (image?.naturalWidth && image.naturalHeight) {
    return image.naturalWidth / image.naturalHeight;
  }

  return item.aspectRatio ?? fallbackAspectRatio;
}

export const GalleryTile = memo(function GalleryTile({
  item,
  fallbackAspectRatio,
  isSelected,
  onSelect,
  scrollRoot,
}: {
  item: GalleryItem;
  fallbackAspectRatio: number;
  isSelected: boolean;
  onSelect: (selection: ViewerSelection) => void;
  scrollRoot?: Element | null;
}) {
  const tileRef = useRef<HTMLButtonElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectRatio = item.aspectRatio ?? fallbackAspectRatio;
  const gridImage = item.thumbnail ?? item.image;

  useEffect(() => {
    setIsLoaded(false);
  }, [gridImage]);

  useEffect(() => {
    const node = tileRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { root: scrollRoot ?? null, rootMargin: '240px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [scrollRoot]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const media = event.currentTarget.querySelector('.gallery-media');
    const image = event.currentTarget.querySelector('img');

    if (!(media instanceof HTMLElement)) {
      return;
    }

    onSelect({
      item,
      sourceRect: media.getBoundingClientRect(),
      sourceElement: media,
      aspectRatio: getImageAspectRatio(
        item,
        fallbackAspectRatio,
        image instanceof HTMLImageElement ? image : null
      ),
      grabPoint: { x: event.clientX, y: event.clientY },
    });
  };

  return (
    <button
      ref={tileRef}
      type="button"
      className="gallery-tile"
      data-selected={isSelected ? 'true' : undefined}
      aria-label={item.title ? `Open ${item.title}` : 'Open gallery item'}
      onClick={handleClick}
    >
      <span className="gallery-tile-shell">
        <span
          className="gallery-media"
          style={{ ['--gallery-aspect-ratio' as string]: aspectRatio }}
        >
          {shouldLoad ? (
            <img
              src={gridImage}
              alt={item.title ?? ''}
              decoding="async"
              fetchPriority="low"
              onLoad={() => setIsLoaded(true)}
              className={isLoaded ? 'is-loaded' : undefined}
            />
          ) : null}
        </span>
      </span>
    </button>
  );
});
