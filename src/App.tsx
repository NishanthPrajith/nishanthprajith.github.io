import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';

import MoveFrom from './loading/pageLoading/pageChange';

import NavBar from './components/navbar/navbar';
import Home from './pages/home/home';
import About from './pages/about/about';
import Project from './pages/project/project';
import Contact from './pages/contact/contact';
import Footer from './components/footer/footer';
import ProjectId from './pages/project/individual-project/project-id';
import ErrorPage from './pages/error/404Error';
import PersonalPortfolioText from './components/portfolio-text/portfolio-text';
import DotRing from './components/navbar/DotRing/DotRing';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import UpgradeLoadingComponent from './pages/upgrade-pending/upgrade-loading.component';

function App() {
  const location = useLocation();

  const [check, setCheck] = useState(false);

  const upgradeIncoming = true;

  useEffect(() => {
    var v = location.pathname;
    if (v === '/' || v === '/home' || v === '/about' || v === '/contactme') {
      setCheck(false);
    } else if (v.includes('/project')) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [location]);

  if (upgradeIncoming) {
    return <UpgradeLoadingComponent />;
  }

  return (
    <div
      className="App"
      style={
        check
          ? {
              backgroundPosition: 'bottom',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundImage: 'url(/images/one_error.jpg)',
            }
          : {}
      }
    >
      <DotRing />
      <NavBar></NavBar>

      <div className="scroll">
        <AnimatePresence>
          <Switch location={location} key={location.key}>
            <Route exact path="/">
              <MoveFrom />
              <Home />
            </Route>
            <Route exact path="/about">
              <MoveFrom />
              <About />
            </Route>
            <Route exact path="/projects/:projectId" component={ProjectId} />
            <Route path="/projects">
              <MoveFrom />
              <Project />
            </Route>
            <Route exact path="/contactme">
              <MoveFrom />
              <Contact />
            </Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      <Footer />
      <PersonalPortfolioText />
      <Version versionNumber={'v2.0'} />
    </div>
  );
}

export default App;

const Version = ({ versionNumber }: { versionNumber: string }) => {
  return (
    <div className="versionNumber">
      <p>{versionNumber}</p>
    </div>
  );
};
