import './intro.scss';

import { useLayoutEffect } from 'react';

export default function Intro() {
  useLayoutEffect(() => {
    const loader = document.querySelector('.loading-container');

    window.addEventListener('animationend', () => {
      loader?.classList.add('is-hidden');
    });
  }, []);

  return (
    <>
      <div className="loading-container" />
      <section className="intro section">
        <div>
          <div className="hero">
            <h1 className="hero-title">
              Building software
              <br />
              worth using
            </h1>
            <p className="hero-subtext">
              Currently working at McKinsey & Company
              <br />
              as a Senior Software Engineer
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
