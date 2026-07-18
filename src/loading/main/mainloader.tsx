import './mainLoader.css';
import { motion, Variants } from 'framer-motion';

export default function MainLoader() {
  const topVariants: Variants = {
    initial: {
      height: '50vh',
    },
    final: {
      height: '0vh',
      transition: {
        ease: 'easeInOut',
        default: { delay: 2.5, duration: 2 },
      },
    },
    done: {
      display: 'none',
    },
  };

  const pConstraint: Variants = {
    initial: {
      display: 'block',
    },
    final: {
      display: 'block',
      transition: {
        ease: 'easeInOut',
        default: { delay: 4, duration: 0 },
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <div className="mainPlaceholder">
      <motion.div
        className="mainLoaderOne"
        variants={topVariants}
        initial="initial"
        animate="final"
        exit="done"
      >
        <motion.p variants={pConstraint} initial="initial" animate="final">
          Creativity and Curiosity
        </motion.p>
      </motion.div>
      <motion.div
        className="mainLoaderTwo"
        variants={topVariants}
        initial="initial"
        animate="final"
        exit="done"
      >
        <motion.p variants={pConstraint} initial="initial" animate="final">
          is what I thrive upon
        </motion.p>
      </motion.div>
    </div>
  );
}
