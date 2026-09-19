import './project-detail.scss';

import Button from '../../../../../components/button/button';
import ProjectContent from './components/project-content/project-content';
import { Helmet } from 'react-helmet-async';
import { CarouselCardItem } from '../../../../../data/types';
import FooterLogo from '../../footer-logo/footer-logo';

export default function ProjectPage({
  project,
}: {
  project: CarouselCardItem;
}) {
  return (
    <>
      {project.image && (
        <div
          className="project-image"
          style={{
            ...(project.image
              ? { backgroundImage: `url(${project.image})` }
              : {}),
            ...(project.imageStyle ? project.imageStyle : {}),
          }}
        />
      )}
      <div className="project">
        <Helmet>
          <title>Case Study - {project.title}</title>
          <meta name="description" content={project.description} />
        </Helmet>

        <div className="project-header">
          <div className="short-display project-header-title-container">
            <p className="case-study-text">Case Study</p>
            <h1 className="project-title">{project.title}</h1>
          </div>
          <p className="short-display project-description">
            {project.description}
          </p>
          <div className="short-display button-container">
            {project.href && (
              <Button
                onClick={() => {
                  window.open(project.href, '_blank');
                }}
              >
                Open Project
              </Button>
            )}
          </div>
        </div>

        <div className="divider short-display divider-container" />

        <ProjectContent content={project.content ?? []} />

        <div className="footer-logo-container">
          <FooterLogo />
        </div>
      </div>
    </>
  );
}
