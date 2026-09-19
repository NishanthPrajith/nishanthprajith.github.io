import './main.scss';

import { Helmet } from 'react-helmet-async';

import RichTextSection from './components/text-section/rich-text-section';
import Achievements from './components/achievements/achievements';
import Footer from './components/footer/footer';
import GalleryCarousel from './components/gallery-carousel/gallery-carousel';
import Projects from './components/projects/projects';
import Intro from './components/intro/intro';
import ScrollIndicator from '../../components/scroll-indicator/scroll-indicator';

export default function MainPage() {
  return (
    <div className="page">
      <Helmet>
        <title>Nishanth Prajith - Portfolio</title>
        <meta name="description" content="Nishanth Prajith's portfolio." />
      </Helmet>

      <ScrollIndicator variant="main" />

      <main className="main">
        <div className="shell">
          <div className="landing landing-page">
            <Intro />

            <RichTextSection>
              <p>
                I am a software engineer with experience across front-end and
                back-end development, driven by curiosity for new technologies
                and a focus on building products that are both functional and
                thoughtfully designed.
              </p>
              <p>
                I have been building for the web since high school, when I won
                the New York State SkillsUSA Web Design Competition two years in
                a row.
              </p>
            </RichTextSection>

            <Achievements />

            <RichTextSection
              style={{
                marginBottom: '3rem',
              }}
            >
              <p>
                Since then, I have had the opportunity to build across a range
                of products, technologies, and ideas. Here are a few that stand
                out.
              </p>
            </RichTextSection>

            <Projects />

            <RichTextSection>
              <p>My experience spans software engineering, product, and AI:</p>
              <div>
                <h3>Senior Software Engineer · McKinsey & Company</h3>
                <p className="short-text">Feb 2023 - Present</p>
                <ul>
                  <li>Designing AI-native products and digital workflows</li>
                  <li>
                    Architecting scalable platforms across complex product
                    ecosystems
                  </li>
                  <li>
                    Applying AI and machine learning to real-world products
                  </li>
                  <li>
                    Leading technical strategy, delivery, and platform evolution
                  </li>
                </ul>
              </div>
            </RichTextSection>

            <RichTextSection
              style={{
                marginBottom: '3rem',
              }}
            >
              <p>
                More recently, I have picked up photography, capturing moments
                with a <strong>Fujifilm XM5 camera</strong>
              </p>
            </RichTextSection>

            <GalleryCarousel />

            <RichTextSection>
              <p>
                I like making things, from digital products and experiments to
                the occasional photograph.
              </p>
              <p>
                I am always interested in learning something new, exploring an
                idea, or simply seeing where curiosity takes me.{' '}
              </p>
              <p>
                Currently in <strong>London, UK</strong>, where I am building,
                learning, and capturing moments along the way.
              </p>
              <p>
                <i>Thanks for stopping by</i>
              </p>
            </RichTextSection>

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
