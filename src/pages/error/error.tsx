import './error.scss';

import Button from '../../components/button/button';
import { useHistory } from 'react-router';
import NavBar from '../../components/navbar/navbar';

export default function ErrorPage() {
  // Hooks
  const history = useHistory();

  return (
    <>
      <NavBar />
      <div className="error">
        <p className="error-text">( 404 )</p>
        <p className="error-message">
          The page you are looking for doesn't exist or has been moved
        </p>
        <Button onClick={() => history.push('/')}>Go Home</Button>
      </div>
    </>
  );
}
