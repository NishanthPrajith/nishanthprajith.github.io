import { motion, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import './project.css';
import { Link } from 'react-router-dom';

import data from './individual-project/data.json';

export default function Project() {
  const [selection, setSelection] = useState(0);

  const [projectData, setProjectData] = useState(data);

  const animation: Variants = {
    initial: {
      opacity: 0,
    },
    final: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        default: { delay: 1.5, duration: 1 },
      },
    },
  };

  const hoverProjectAnimation: Variants = {
    animate: {
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
      },
    },
  };

  function changeCursor() {
    window.scroll(0, 0);
  }

  function filterSelection(select: number) {
    setSelection(select);

    var arr = [];

    if (select === 0) {
      setProjectData(data);
    } else if (select === 1) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].id.length; j++) {
          if (data[i].id[j] === 'Data Science') {
            arr.push(data[i]);
            break;
          }
        }
      }
      setProjectData(arr);
    } else if (select === 2) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].id.length; j++) {
          if (data[i].id[j] === 'Software Engineering') {
            arr.push(data[i]);
            break;
          }
        }
      }
      setProjectData(arr);
    } else {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].id.length; j++) {
          if (data[i].id[j] === 'Machine Learning') {
            arr.push(data[i]);
            break;
          }
        }
      }
      setProjectData(arr);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Projects Page • Nishanth Prajith</title>
      </Helmet>
      <motion.div variants={animation} initial="initial" animate="final">
        <div className="headerLanding">
          <div>
            <h1>Collection of all my projects.</h1>
          </div>
          <div className="filters">
            <p
              className={selection === 0 ? '' : 'btn10'}
              onClick={() => {
                filterSelection(0);
              }}
              style={
                selection === 0
                  ? { backgroundColor: '#1C1D20', color: 'white' }
                  : {}
              }
            >
              All
            </p>
            <p
              className={selection === 1 ? '' : 'btn10'}
              onClick={() => {
                filterSelection(1);
              }}
              style={
                selection === 1
                  ? { backgroundColor: '#1C1D20', color: 'white' }
                  : {}
              }
            >
              Data Science<sup>3</sup>
            </p>
            <p
              className={selection === 2 ? '' : 'btn10'}
              onClick={() => {
                filterSelection(2);
              }}
              style={
                selection === 2
                  ? { backgroundColor: '#1C1D20', color: 'white' }
                  : {}
              }
            >
              Software Engineering<sup>3</sup>
            </p>
            <p
              className={selection === 3 ? '' : 'btn10'}
              onClick={() => {
                filterSelection(3);
              }}
              style={
                selection === 3
                  ? { backgroundColor: '#1C1D20', color: 'white' }
                  : {}
              }
            >
              Machine Learning<sup>2</sup>
            </p>
          </div>
        </div>
        <div className="listofProjects">
          <div className="heading">
            <div className="headers">
              <p>PROJECT NAME</p>
              <p>TAGS</p>
            </div>

            <hr className="stripe"></hr>
          </div>

          <div>
            {projectData.map((project, index) => {
              return (
                <div>
                  <Link
                    to={'/projects/' + project.index}
                    onClick={changeCursor}
                  >
                    <motion.div
                      variants={hoverProjectAnimation}
                      initial="initial"
                      whileHover="animate"
                      className="individualProject"
                    >
                      <h1>{project.title}</h1>
                      <p>{project.tags}</p>
                    </motion.div>
                  </Link>
                  <hr className="stripe"></hr>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
