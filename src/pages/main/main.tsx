import './main.scss';

import Intro from './components/intro/intro';
import Achievements from './components/achievements/achievements';
import ProjectsList from './components/projects-list/projects-list';
import NavBar from '../../components/navbar/navbar';
import Gallery from './components/gallery/gallery';

export default function MainPage() {
  return (
    <>
      <NavBar />
      <div className="main-page">
        <Intro />

        <Achievements />

        <div className="projects-list-container">
          <ProjectsList />

          <div className="placeholder-separator">
            <div className="placeholder-separator-line"></div>
          </div>

          <Gallery />
        </div>
      </div>
    </>
  );
}
