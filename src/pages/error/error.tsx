import './error.scss';

import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet-async';
import FooterLogo from '../main/components/footer-logo/footer-logo';

function ErrorEyes() {
  return (
    <div className="error-eyes" aria-hidden="true">
      <svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg">
        <g className="error-eyes-eye error-eyes-eye-left">
          <path
            d="M 52 58 C 48 32, 72 24, 95 28 C 118 32, 124 52, 118 72 C 110 88, 82 92, 62 78 C 48 68, 50 58, 52 58 Z"
            fill="white"
          />
          <circle cx="88" cy="50" r="7.5" fill="var(--black-color)" />
        </g>
        <g className="error-eyes-eye error-eyes-eye-right">
          <path
            d="M 148 48 C 146 32, 162 26, 178 28 C 198 30, 206 44, 204 58 C 200 72, 182 76, 166 68 C 152 60, 150 52, 148 48 Z"
            fill="white"
          />
          <circle cx="178" cy="46" r="5.5" fill="var(--black-color)" />
        </g>
      </svg>
    </div>
  );
}

export default function ErrorPage() {
  // Hooks
  const history = useHistory();

  return (
    <div className="error-page" onClick={() => history.push('/')}>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Error page" />
      </Helmet>
      <section className="error">
        <section className="error-content">
          <ErrorEyes />
          <p className="error-message">
            Oops! Looks like you are lost. Click anywhere to go back to the home
            page.
          </p>
        </section>

        <section className="error-logo-section">
          <FooterLogo color="var(--white-color)" />
        </section>
      </section>
    </div>
  );
}
