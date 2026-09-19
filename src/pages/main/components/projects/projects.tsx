import { useState } from 'react';
import { PROJECT_CARDS } from '../../../../data/project-data';
import { CarouselCardItem } from '../../../../data/types';
import Carousel from '../carousel/carousel';
import BottomSheet, {
  useBottomSheet,
} from '../../../../components/bottom-sheet/bottom-sheet';
import ProjectPage from './project-detail/project-detail';

export default function Projects() {
  // States
  const [selection, setSelection] = useState<CarouselCardItem | null>(null);

  // Hooks
  const sheet = useBottomSheet();

  const handleClick = (project: CarouselCardItem) => {
    if (project.href && !project.content) {
      window.open(project.href, '_blank');
      return;
    }

    if (!project.content || project.content.length === 0) {
      return;
    }
    setSelection(project);
    sheet.open();
  };

  const handleClose = () => {
    setSelection(null);
    sheet.close();
  };

  return (
    <section className="projects">
      <Carousel
        items={PROJECT_CARDS}
        variant="project"
        onItemClick={handleClick}
      />
      <BottomSheet
        isOpen={sheet.isOpen}
        onClose={handleClose}
        showScrollIndicator
      >
        {selection && <ProjectPage project={selection} />}
      </BottomSheet>
    </section>
  );
}
