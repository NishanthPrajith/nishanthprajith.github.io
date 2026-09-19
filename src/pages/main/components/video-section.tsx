import type { CSSProperties } from 'react';

import { VIDEO } from '../../../data/data';

export default function VideoSection() {
  return (
    <section className="section-reel">
      <div
        className="reel blur-video"
        style={{ '--scale': 0.6 } as CSSProperties}
      >
        <div className="reel-wrapper wrapper">
          <div className="reel-video-wrap video-wrapper">
            <div className="reel-video video">
              <video
                poster={VIDEO.poster}
                aria-label=""
                muted
                autoPlay
                loop
                playsInline
              >
                <source src={VIDEO.src} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="reel-canvas-wrap canvas-container">
            <canvas className="reel-canvas blur-canvas" />
          </div>
        </div>
      </div>
    </section>
  );
}
