import { AnimatePresence, motion } from "framer-motion"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Home() {
    return (
        <AnimatePresence>
            <motion.div className="w-full flex flex-wrap items-center justify-center flex-col p-5 relative"
                initial = {{x: -50, opacity: 0}}
                animate = {{x: 0, opacity: 1}}
                exit = {{x: -50, opacity: 0}}
            >
                <h1 className="text-2xl">Home</h1>
                <div className="flex flex-col items-center justify-center gap-5">
                    <h2>Grading Calculator by arensagun2</h2>
                    <a className="hover:cursor-pointer" target="blank" href="https://github.com/arensagun2"><FontAwesomeIcon icon="fa-brands fa-github" size="5x"></FontAwesomeIcon></a>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}