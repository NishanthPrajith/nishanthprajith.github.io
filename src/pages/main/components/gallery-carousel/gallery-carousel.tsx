import './gallery-carousel.scss';

import Carousel from '../carousel/carousel';
import ButtonList from '../../../../components/button-list/button-list';
import { EVENT_CARDS } from '../../../../data/gallery-data';
import { uniq } from 'lodash';
import { useState } from 'react';
import { ViewerSelection } from '../../../../data/types';
import { GalleryPreview } from '../gallery-preview/gallery-preview';
import BottomSheet, {
  useBottomSheet,
} from '../../../../components/bottom-sheet/bottom-sheet';
import { Helmet } from 'react-helmet-async';

type GalleryCarouselProps = {
  sheetView?: boolean;
  initialActiveFilter?: {
    index: number;
    label: string;
  };
};

export default function GalleryCarousel({
  sheetView = false,
  initialActiveFilter = {
    index: 0,
    label: 'Highlights',
  },
}: GalleryCarouselProps) {
  // States
  const [activeFilter, setActiveFilter] = useState<{
    index: number;
    label: string;
  }>(initialActiveFilter);
  const [selection, setSelection] = useState<ViewerSelection | null>(null);

  // Hooks
  const sheet = useBottomSheet();

  // Handlers
  const handleButtonClick = (label: string, index: number) => () => {
    setActiveFilter({ index, label });

    if (!sheetView) {
      setSelection(null);
      sheet.open();
    }
  };

  const handleSheetClose = () => {
    setActiveFilter({ index: 0, label: 'Highlights' });
    setSelection(null);
    sheet.close();
  };

  const options: Array<string> = [
    'Highlights',
    ...uniq(
      EVENT_CARDS.filter((item) => item.group).map((item) => item.group ?? '')
    ),
  ];

  const images = EVENT_CARDS.filter((item) => {
    if (activeFilter.index === 0 || !sheetView) {
      return item?.photo?.highlight;
    }
    return item.group === activeFilter.label;
  });

  return (
    <section
      className="gallery-carousel"
      style={sheetView ? { marginBottom: '0rem' } : {}}
    >
      {sheetView && (
        <Helmet>
          <title>Gallery - {activeFilter.label}</title>
          <meta
            name="description"
            content={`Gallery of Nishanth Prajith's ${activeFilter.label} photos`}
          />
        </Helmet>
      )}
      {sheetView && (
        <p
          className="gallery-carousel-sheet-view-title"
          style={{
            fontFamily: 'var(--marcellus-font)',
          }}
        >
          {activeFilter.label}
        </p>
      )}
      <Carousel
        items={images}
        variant="photo-gallery"
        style={{ marginBottom: '0rem' }}
        onViewerSelect={setSelection}
      />

      <section
        className={`gallery-carousel-buttons ${sheetView ? 'gallery-carousel-buttons-sheet-view' : ''}`}
      >
        <ButtonList
          activeIndex={!sheetView ? 0 : activeFilter.index}
          buttons={options.map((option, idx) => ({
            label: option,
            onClick: handleButtonClick(option, idx),
          }))}
        />
      </section>

      {selection && (
        <GalleryPreview
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}
      {!sheetView && (
        <BottomSheet isOpen={sheet.isOpen} onClose={handleSheetClose}>
          <GalleryCarousel
            sheetView={!sheetView}
            initialActiveFilter={activeFilter}
          />
        </BottomSheet>
      )}
    </section>
  );
}
