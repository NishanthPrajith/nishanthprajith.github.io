import { CarouselCardItem } from './types';
import { californiaWildfireContent } from './projects/california-wildfire/california-wildfire';
import { carDetectionContent } from './projects/car-detection/car-detection';
import { curveFittingContent } from './projects/curve-fitting/curve-fitting';

export const PROJECT_CARDS: CarouselCardItem[] = [
  {
    id: 'car-identification-app',
    href: 'https://github.com/NishanthPrajith/car-identification-app',
    image: '../../images/car-detection-app/car-detection.png',
    title: 'Car Identification from Photos',
    description:
      'AI-powered car identification from images, with model specifications, search, and favorites',
    content: carDetectionContent,
    imageStyle: {
      backgroundColor: '#D7191E',
      backgroundSize: 'contain',
    },
  },
  {
    id: 'california-wildfire-detection',
    href: 'https://github.com/NishanthPrajith/california-wildfire-detection',
    image: '../../images/wildfire-detection/wildfire.png',
    title: 'Predicting Wildfire Risk Across California',
    description:
      'Machine learning models for mapping wildfire risk from historical environmental data',
    content: californiaWildfireContent,
  },
  {
    id: 'least-squares-curve-fitting',
    href: 'https://github.com/NishanthPrajith/curve-fitting-using-least-squares-approximation',
    image: '../../images/curve-fitting/curve-fitting.png',
    title: 'Least Squares Curve Fitting on NYC Open Data',
    description:
      'Exploring long-term trends in NYC population and water consumption through curve fitting',
    content: curveFittingContent,
  },
  {
    id: 'e-commerce-marketplace',
    href: 'https://github.com/NishanthPrajith/ecommerce-project',
    image: '../../images/ecommerce/ecommerce.png',
    title: 'Role-Based E-commerce Marketplace',
    description:
      'A React and Firebase marketplace with tailored experiences for buyers, chefs, and managers',
  },
  {
    id: 'convex-hull-visualizer',
    href: 'https://nishanthprajith.github.io/convex-hull-visualization/',
    image: '../../images/convex-hull/convex-hull.png',
    title: 'Convex Hull Algorithm Visualizer',
    description:
      'An interactive visualization of classic computational geometry algorithms',
  },
  {
    id: 'password-revealer',
    href: 'https://github.com/NishanthPrajith/password-revealer',
    image: '../../images/password-reveal/password-reveal.png',
    title: 'Flashlight Password Reveal Interaction',
    description:
      'A Flutter recreation of an interactive password reveal effect',
  },
];
