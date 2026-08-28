import './project.scss';

import Button from '../../components/button/button';
import NavBar from '../../components/navbar/navbar';
import ProjectContent from './components/project-content/project-content';
import { Project } from '../../data/project-list';

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <div className="project">
      <NavBar />
      <div className="project-header">
        <div className="project-header-title-container">
          <p className="case-study-text">Case Study</p>
          <p className="project-title">{project.title}</p>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="button-container">
          {project.link && (
            <Button
              onClick={() => {
                window.open(project.link, '_blank');
              }}
            >
              Open Project
            </Button>
          )}
        </div>
      </div>

      <div
        className="project-image"
        style={{
          ...(project.image
            ? { backgroundImage: `url(${project.image})` }
            : {}),
          ...(project.imageStyle ? project.imageStyle : {}),
        }}
      />

      <ProjectContent content={project.content ?? []} />
    </div>
  );
}
