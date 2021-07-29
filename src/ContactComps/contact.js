
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function About() {

    const animation = {
        "initial" : {
            opacity: 0,
        },
        "final" : {
            opacity: 1,
            transition: {
                ease: "easeInOut",
                default: { delay: 1.5, duration: 1 },
            },
        },
    }


    return (
        <div style = {{overflow: "none"}}>
            <Helmet>
                <title>Contact Me Page | Nishanth Prajith</title>
            </Helmet>
            <motion.div variants = {animation} initial = "initial" animate = "final">
                <h1>Contact Page</h1>
            </motion.div>
        </div>
    )
}