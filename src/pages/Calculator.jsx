import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Calculator() {
    const scoreRef = useRef();
    const weightRef = useRef();
    const [rows, setrows] = useState([]);

    const updateRow = () => {
        const newScore = scoreRef.current.value;
        const newWeight = weightRef.current.value;
        let rowCount = rows.length;

        setrows(prev => [...prev, {num: rowCount, score: newScore, weight: newWeight}]);
    }

    return (
        <AnimatePresence>
            <motion.div className="w-full flex flex-wrap items-center flex-col p-5 relative"
                initial = {{x: -50, opacity: 0}}
                animate = {{x: 0, opacity: 1}}
                exit = {{x: -50, opacity: 0}}
            >
                <h1 className="text-2xl">Calculator</h1>

                <div className="bg-slate-200">
                    <div>
                        {rows.map((row) => {
                            return <h1 key={row.num}>{row.score}, {row.weight}</h1>
                        })}
                    </div>

                    <div>
                        <input type="text" ref={scoreRef} />
                        <input type="text" ref={weightRef} />
                    </div>
                    
                    <div className="bg-slate-500">
                        <button onClick={updateRow}>Add Row</button>
                        <button>Calculate</button>
                    </div>
                </div>
                
            </motion.div>
        </AnimatePresence>
    )
}