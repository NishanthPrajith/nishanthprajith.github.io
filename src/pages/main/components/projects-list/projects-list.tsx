import './projects-list.scss';

import {
  Project,
  projectList as projects,
} from '../../../../data/project-list';
import { useHistory } from 'react-router-dom';

export default function ProjectsList() {
  const history = useHistory();

  const handleProjectClick = (project: Project) => {
    if (Boolean(project.content)) {
      history.push(`/projects/${project.id}`);
    } else {
      window.open(project.link, '_blank');
    }
  };

  return (
    <div className="projects">
      <p className="projects-title">Selected Projects ({projects.length})</p>
      <div className="projects-container">
        {projects.map((project, idx) => (
          <>
            <div
              onClick={() => handleProjectClick(project)}
              className="project-card"
            >
              <div className="project-card-content">
                <p>{project.title}</p>
                <p className="project-card-description">
                  {project.tags.join(' - ')}
                </p>
              </div>
              {project.link && (
                <div className="arrow-icon">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="var(--black-color)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
            {idx < projects.length - 1 && <div className="divider"></div>}
          </>
        ))}
      </div>
    </div>
  );
}
