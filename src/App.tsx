import './App.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import ErrorPage from './pages/error/error';
import MainPage from './pages/main/main';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Switch location={location} key={location.key}>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
