import './main.scss';

import Intro from './components/intro/intro';
import Achievements from './components/achievements/achievements';
import Projects from './components/projects/projects';

export default function MainPage() {
  return (
    <div className="main-page">
      <Intro />

      <Achievements />

      <Projects />
    </div>
  );
}
