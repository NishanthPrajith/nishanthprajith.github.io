import './project.scss';

import Button from '../../components/button/button';
import NavBar from '../../components/navbar/navbar';
import ProjectContent from './components/project-content/project-content';
import { Project } from '../../data/project-list';
import { Helmet } from 'react-helmet';

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <div className="project">
      <Helmet>
        <title>{project.title} | Case Study</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <NavBar />
      <div className="project-header">
        <div className="project-header-title-container">
          <p className="case-study-text">Case Study</p>
          <h1 className="project-title">{project.title}</h1>
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
