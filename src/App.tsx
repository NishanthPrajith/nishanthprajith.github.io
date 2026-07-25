import './App.scss';
import { Route, Switch, useLocation } from 'react-router-dom';

import MainPage from './pages/main/main';
import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <NavBar />
      <Switch location={location} key={location.key}>
        <Route exact path="/">
          <MainPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
