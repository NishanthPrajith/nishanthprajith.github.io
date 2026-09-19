import { CarouselCardItem, ViewerSelection } from '../../../../data/types';
import './carousel-card.scss';

type Props = {
  item: CarouselCardItem;
  variant?: 'project' | 'photo-gallery';
  onItemClick?: (item: CarouselCardItem) => void;
  onViewerSelect?: (selection: ViewerSelection) => void;
};

export default function CarouselCard({
  item,
  variant = 'project',
  onItemClick,
  onViewerSelect,
}: Props) {
  const isClickable = item.href && item.href !== '#';
  const showCtaText = Boolean(item.title) && variant === 'project';
  const imageSrc = item.photo?.thumbnail ?? item.image;

  const classNames = [
    'carousel-card',
    variant === 'project'
      ? 'carousel-card-project'
      : 'carousel-card-photo-gallery',
  ].join(' ');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (variant === 'photo-gallery' && onViewerSelect) {
      const media = event.currentTarget.querySelector('.carousel-card-bg');

      if (!(media instanceof HTMLElement)) {
        return;
      }

      onViewerSelect({
        item,
        sourceRect: media.getBoundingClientRect(),
        sourceElement: media,
        aspectRatio: item.photo?.aspectRatio ?? 4 / 5,
        grabPoint: { x: event.clientX, y: event.clientY },
      });
      return;
    }

    onItemClick?.(item);
  };

  return (
    <section
      className={classNames}
      onClick={handleClick}
      style={
        variant === 'photo-gallery'
          ? {
              ['--aspect-ratio' as string]: item.photo?.aspectRatio ?? 4 / 5,
            }
          : {}
      }
    >
      <div className="carousel-card-bg">
        <img
          src={imageSrc}
          alt={item.title ?? ''}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      {showCtaText && (
        <div className="carousel-card-caption">
          <div className="carousel-card-text">
            <p>
              <strong>{item.title}</strong>
              {item.description ? (
                <>
                  <br />
                  <span className="carousel-card-description">
                    {item.description}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          {isClickable && (
            <div className="carousel-card-icon">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
