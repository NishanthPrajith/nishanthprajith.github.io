import './main.css';

import Intro from './components/intro/intro';
import Achievements from './components/achievements/achievements';
import Projects from './components/projects/projects';
import Gallery from './components/gallery/gallery';

export default function MainPage() {
  return (
    <div className="main-page">
      <Intro />

      <Achievements />

      <Projects />

      {/* <Gallery /> */}
    </div>
  );
}
