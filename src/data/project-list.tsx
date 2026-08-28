import { californiaWildfireContent } from './projects/california-wildfire/california-wildfire';
import { carDetectionContent } from './projects/car-detection/car-detection';
import { curveFittingContent } from './projects/curve-fitting/curve-fitting';

import { ProjectData } from './projects/types';

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  content?: ProjectData[];
  image?: string;
  imageStyle?: React.CSSProperties;
};

export const projectList: Project[] = [
  {
    id: 'car-detection-app',
    title: 'Car Detection App',
    description:
      'Developed a mobile app that identifies cars from smartphone photos using a custom PyTorch model trained on 1M+ images across 900+ car classes, then displays detailed vehicle specifications. Built with PyTorch, Flutter, and Firebase.',
    tags: ['Flutter', 'PyTorch', 'Firebase'],
    link: 'https://github.com/NishanthPrajith/carIdentificationApp',
    content: carDetectionContent,
    image: '../../images/car-detection-app/car-detection-main.png',
    imageStyle: {
      backgroundPosition: 'center',
      backgroundSize: '60%',
      backgroundColor: '#141413',
    },
  },
  {
    id: 'california-wildfire-detection',
    title: 'California Wildfire Detection',
    description: `In this group project, my team analyzed historical wildfire data to identify regions 
    in California that are most susceptible to fire risks and quantify the level of threat 
    across different areas. We then evaluated various machine learning models to predict 
    wildfire occurrences based on weather patterns and environmental factors`,
    tags: ['Scikit-learn', 'Pandas', 'Numpy'],
    link: 'https://github.com/NishanthPrajith/Data_Science_Final_Project',
    content: californiaWildfireContent,
    image: '../../images/wildfire-detection/california-wildfire.jpg',
  },
  {
    id: 'e-commerce-website',
    title: 'E-commerce website',
    description:
      'Developed a mobile app that identifies cars from smartphone photos using a custom PyTorch model trained on 1M+ images across 900+ car classes, then displays detailed vehicle specifications. Built with PyTorch, Flutter, and Firebase.',
    tags: ['Firebase', 'React', 'HTML', 'CSS', 'Javascript'],
  },
  {
    id: 'curve-fitting',
    title: 'Curve Fitting using Least Squares',
    description: `Built a generalized least squares approximation framework to automate 
    polynomial curve fitting across datasets and degrees of precision. Applied the model 
    to NYC Open Data population and water consumption datasets to identify trends and 
    analyze the effectiveness of different curve approximations.`,
    tags: ['Python', 'pandas', 'numpy', 'NYC Open Data'],
    content: curveFittingContent,
    link: 'https://github.com/NishanthPrajith/Curve-Fitting-using-Least-Squares-Approximation',
    image: '../../images/curve-fitting/curve-fitting.jpg',
  },
  {
    id: 'events-app',
    title: 'Events App UI',
    description:
      'Developed a mobile app that identifies cars from smartphone photos using a custom PyTorch model trained on 1M+ images across 900+ car classes, then displays detailed vehicle specifications. Built with PyTorch, Flutter, and Firebase.',
    tags: ['Flutter', 'Animation'],
    link: 'https://github.com/NishanthPrajith/EventsAppUI',
  },
  {
    id: 'password-reveal',
    title: 'Password Reveal UI',
    description:
      'Developed a mobile app that identifies cars from smartphone photos using a custom PyTorch model trained on 1M+ images across 900+ car classes, then displays detailed vehicle specifications. Built with PyTorch, Flutter, and Firebase.',
    tags: ['Flutter', 'Animation'],
    link: 'https://github.com/NishanthPrajith/passwordRevealer',
  },
  {
    id: 'convex-hull',
    title: 'Convex Hull Visualization',
    description:
      'Developed a mobile app that identifies cars from smartphone photos using a custom PyTorch model trained on 1M+ images across 900+ car classes, then displays detailed vehicle specifications. Built with PyTorch, Flutter, and Firebase.',
    tags: ['Convex Hull', 'HTML', 'CSS', 'Javascript'],
    link: 'https://nishanthprajith.github.io/Convex_Hull_Visualization/',
  },
];
