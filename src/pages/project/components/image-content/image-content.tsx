import './image-content.scss';

import { ImageProps } from '../../../../data/projects/types';

export default function Image({
  image,
  images,
  height,
  backgroundColor = 'var(--cream-color)',
  caption,
  credits,
  showPadding,
}: ImageProps) {
  let allImages = [...(images ?? [])];
  if (image) {
    allImages.push(image);
  }

  return (
    <div className="project-dynamic-content">
      <div
        className="image-container"
        style={{
          backgroundColor: backgroundColor,
          height: height ?? '50vh',
          borderRadius: 'var(--border-radius)',
          backgroundRepeat: 'no-repeat',
          padding: showPadding ? '2rem 0' : '0',
        }}
      >
        {allImages.map((img, index) => (
          <img src={img} key={index} alt={`${index}`} />
        ))}
      </div>

      {caption && (
        <p className="caption short-display">
          {caption}
          {credits && (
            <span className="caption-credits"> Source: {credits}</span>
          )}
        </p>
      )}
    </div>
  );
}
