import './App.scss';
import { Route, Switch, useLocation } from 'react-router-dom';

import MainPage from './pages/main/main';
import Footer from './components/footer/footer';
import ErrorPage from './pages/error/error';
import ProjectPage from './pages/project/project';
import { projectList } from './data/project-list';
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [location]);

  const routes = [
    '/',
    ...projectList
      .filter((project) => project.content)
      .map((project) => `/projects/${project.id}`),
  ];

  return (
    <div className="App">
      <Switch location={location} key={location.key}>
        <Route exact path="/">
          <MainPage />
        </Route>
        {projectList
          .filter((project) => project.content)
          .map((project) => (
            <Route path={`/projects/${project.id}`} key={project.id}>
              <ProjectPage project={project} />
            </Route>
          ))}
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      {routes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
