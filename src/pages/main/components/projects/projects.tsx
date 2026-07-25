import { Link } from 'react-router-dom';
import './projects.css';

export default function Projects() {
  // Data
  const projects = [
    {
      title: 'Car Detection App',
      description: 'Flutter - PyTorch - Firebase',
      link: 'https://github.com/NishanthPrajith/carIdentificationApp',
    },
    {
      title: 'California Wildfire Detection',
      description: 'Scikit-learn - Pandas - Numpy',
      link: 'https://github.com/NishanthPrajith/Data_Science_Final_Project',
    },
    {
      title: 'E-commerce website',
      description: 'Firebase - React - HTML - CSS - Javascript',
    },
    {
      title: 'Curve Fitting using Least Squares',
      description: 'Python - pandas - numpy - NYC Open Data',
      link: 'https://github.com/NishanthPrajith/Curve-Fitting-using-Least-Squares-Approximation',
    },
    {
      title: 'Events App UI',
      description: 'Flutter - Animation',
      link: 'https://github.com/NishanthPrajith/EventsAppUI',
    },
    {
      title: 'Password Reveal UI',
      description: 'Flutter - Animation',
      link: 'https://github.com/NishanthPrajith/passwordRevealer',
    },
    {
      title: 'Convex Hull Visualization',
      description: 'Convex Hull - HTML - CSS - Javascript',
      link: 'https://nishanthprajith.github.io/Convex_Hull_Visualization/',
    },
  ];

  return (
    <div className="projects">
      <p className="projects-title">Projects ({projects.length})</p>
      <div className="projects-container">
        {projects.map((project, idx) => (
          <>
            <a
              href={project.link ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={{
                cursor: project.link ? 'pointer' : 'default',
              }}
            >
              <div className="project-card-content">
                <p className="project-card-title">{project.title}</p>
                <p className="project-card-description">
                  {project.description}
                </p>
              </div>
              {project.link && (
                <div className="arrow-icon">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="var(--black-color)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              )}
            </a>
            {idx < projects.length - 1 && <div className="divider"></div>}
          </>
        ))}
      </div>
    </div>
  );
}
