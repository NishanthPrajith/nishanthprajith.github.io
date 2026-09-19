import './intro.scss';

import { useLayoutEffect, useRef, useState } from 'react';

const LOADER_FALLBACK_MS = 2800;

export default function Intro() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    if (!loader) {
      setIsReady(true);
      return;
    }

    let hidden = false;
    const hide = () => {
      if (hidden) return;
      hidden = true;
      loader.classList.add('is-hidden');
      setIsReady(true);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hide();
      return;
    }

    const onEnd = (event: AnimationEvent) => {
      if (event.animationName === 'gradient-rise') {
        hide();
      }
    };

    loader.addEventListener('animationend', onEnd);
    const timeoutId = window.setTimeout(hide, LOADER_FALLBACK_MS);

    return () => {
      loader.removeEventListener('animationend', onEnd);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className="loading-container" ref={loaderRef} />
      <section className={`intro section${isReady ? ' is-ready' : ''}`}>
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
