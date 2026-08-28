import './gallery.scss';

import { useCallback, useState } from 'react';
import BottomSheet, {
  useBottomSheet,
} from '../../../../components/bottom-sheet/bottom-sheet';
import Button from '../../../../components/button/button';
import { galleryItems } from '../../../../data/gallery-items';
import { GalleryTile } from './components/gallery-tile/gallery-tile';
import { GalleryPreview } from './components/gallery-preview/gallery-preview';
import GalleryFullList from './components/gallery-full-list/gallery-full-list';
import { galleryAspectFallbacks } from '../../../../data/gallery/constants';
import { ViewerSelection } from '../../../../data/gallery/types';

export default function Gallery() {
  const [selection, setSelection] = useState<ViewerSelection | null>(null);
  const [viewerImageReady, setViewerImageReady] = useState(false);
  const sheet = useBottomSheet();

  const closeViewer = useCallback(() => {
    setSelection(null);
    setViewerImageReady(false);
  }, []);

  const handleSelect = useCallback((nextSelection: ViewerSelection) => {
    setViewerImageReady(false);
    setSelection(nextSelection);
  }, []);

  return (
    <section className="gallery">
      <h2 className="gallery-title">Gallery</h2>

      <div
        className="gallery-grid"
        data-viewer-active={selection ? 'true' : undefined}
      >
        {galleryItems
          .filter((item) => item.highlight ?? false)
          .map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              fallbackAspectRatio={
                galleryAspectFallbacks[index % galleryAspectFallbacks.length]
              }
              isSelected={selection?.item.id === item.id && viewerImageReady}
              onSelect={handleSelect}
            />
          ))}
      </div>

      {selection && (
        <GalleryPreview
          selection={selection}
          onClose={closeViewer}
          onImageReady={() => setViewerImageReady(true)}
        />
      )}

      <div className="gallery-actions">
        <Button onClick={sheet.open}>View More</Button>
      </div>

      <BottomSheet
        isOpen={sheet.isOpen}
        onClose={sheet.close}
        title="Gallery"
        subtitle="All of the photos I took using my Fujifilm XM5"
      >
        <GalleryFullList />
      </BottomSheet>
    </section>
  );
}
