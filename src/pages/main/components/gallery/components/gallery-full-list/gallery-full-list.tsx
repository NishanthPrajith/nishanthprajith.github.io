import { useState } from 'react';
import ButtonList from '../../../../../../components/button-list/button-list';
import { galleryItems } from '../../../../../../data/gallery-items';
import { GalleryTile } from '../gallery-tile/gallery-tile';
import './gallery-full-list.scss';
import { GalleryPreview } from '../gallery-preview/gallery-preview';
import { galleryAspectFallbacks } from '../../../../../../data/gallery/constants';
import { ViewerSelection } from '../../../../../../data/gallery/types';
import { uniq as unique } from 'lodash';

export default function GalleryFullList() {
  // States
  const [activeFilter, setActiveFilter] = useState<{
    index: number;
    label: string;
  }>({ index: 0, label: 'All' });
  const [selection, setSelection] = useState<ViewerSelection | null>(null);
  const [viewerImageReady, setViewerImageReady] = useState(false);

  const scrollRoot =
    typeof document !== 'undefined'
      ? document.querySelector('.bottom-sheet-scroll')
      : null;

  // Handlers
  const handleFilterClick = (index: number, label: string) => {
    scrollRoot?.scrollTo({ top: 0 });
    setActiveFilter({ index, label });
  };
  const closeViewer = () => {
    setSelection(null);
    setViewerImageReady(false);
  };
  const handleSelect = (nextSelection: ViewerSelection) => {
    setViewerImageReady(false);
    setSelection(nextSelection);
  };

  // Constants
  const filterLabels = unique([
    'All',
    ...galleryItems.map((item) => item.group),
  ]);

  const filterOptions = filterLabels.map((label, index) => ({
    label,
    onClick: () => handleFilterClick(index, label),
  }));

  const filteredItems = galleryItems.filter(
    (item) => activeFilter.label === 'All' || item.group === activeFilter.label
  );

  return (
    <div className="gallery-full-list">
      <div
        className="gallery-grid"
        data-viewer-active={selection ? 'true' : undefined}
      >
        {filteredItems.map((item, index) => (
          <GalleryTile
            key={item.id}
            item={item}
            fallbackAspectRatio={
              galleryAspectFallbacks[index % galleryAspectFallbacks.length]
            }
            isSelected={selection?.item.id === item.id && viewerImageReady}
            onSelect={handleSelect}
            scrollRoot={scrollRoot}
          />
        ))}
      </div>

      <div className="gallery-filters">
        <ButtonList activeIndex={activeFilter.index} buttons={filterOptions} />
      </div>

      {selection && (
        <GalleryPreview
          selection={selection}
          onClose={closeViewer}
          onImageReady={() => setViewerImageReady(true)}
        />
      )}
    </div>
  );
}
