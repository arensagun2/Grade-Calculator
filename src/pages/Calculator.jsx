import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import { Calculate } from "../functions/calculate";

export default function Calculator() {
    const scoreRef = useRef();
    const weightRef = useRef();
    const [final, setfinal] = useState(null);
    const [score, setscore] = useState('');
    const [weight, setweight] = useState('');
    const [totalweight, settotalweight] = useState(0);
    const [rows, setrows] = useState([]);
    const [error, seterror] = useState("");

    // Updates score input
    const updateScore = (event) => {
        setscore(event.target.value);
    }

    // Clears score input after added
    const clearScore = () => {
        setscore('');
    }

    // Updates weight input
    const updateWeight = (event) => {
        setweight(event.target.value);
    }

    // Clears weight input after added
    const clearWeight = () => {
        setweight('');
    }

    // Updates/Adds row and checks cases
    const updateRow = () => {
        const newScore = scoreRef.current.value;
        const newWeight = weightRef.current.value;
        const weightTemp = totalweight + parseFloat(newWeight);
        let rowCount = rows.length;

        const curScore = newScore.split('/');

        if (!newScore || !newWeight) {
            seterror("Try adding your score and its weight!");
        } else if (curScore.length < 2 || curScore.length > 2 || !curScore[0] || !curScore[1] || isNaN(parseFloat(curScore[0])) || isNaN(parseFloat(curScore[1]))) {
            seterror("Score should be a number and formatted like this: '4/5'");
        } else {
            if (parseFloat(curScore[0]) > parseFloat(curScore[1])) {
                seterror("First number should be less than the second")
            } else if (newWeight > 100) {
                seterror("Weights should be a hundred or less")
            } else if (weightTemp > 100) {
                seterror("Sum of weights should equal to 100")
            } else {
                seterror(null);
                clearScore();
                clearWeight();
                settotalweight(totalweight + parseFloat(newWeight));
                setrows(prev => [...prev, {num: rowCount, score: newScore, weight: newWeight}]);
            }
        }
    }

    // Removes latest row
    const removeRow = () => {
        const row = rows[rows.length - 1];
        settotalweight(totalweight - parseFloat(row.weight))
        const poppedArray = rows.slice(0, -1);
        setrows(poppedArray);
        if (final) {
            setfinal(null);
        }
    }

    // Clears the stack
    const clear = () => {
        setrows([]);
        seterror('')
        setfinal(null);
        settotalweight(0);
        clearScore();
        clearWeight();
    }

    // Calculates the current stack
    const calculate = () => {
        if (totalweight != 100) {
            seterror("Sum of weights should equal to 100")
        } else {
            seterror('')
            const newNumber = new Calculate(rows);
            setfinal(newNumber.actual);
        }
    }

    return (
        <AnimatePresence>
            <motion.div className="w-full flex flex-wrap items-center flex-col p-5 relative"
                initial = {{x: -50, opacity: 0}}
                animate = {{x: 0, opacity: 1}}
                exit = {{x: -50, opacity: 0}}
            >
                <h1 className="text-2xl">Calculator</h1>

                <div className="bg-slate-200 p-4 rounded-md mb-2 w-4/5">
                    <div>
                        {rows.length > 0 ? rows.map((row) => {
                            return  <div key={row.num} className="flex justify-evenly bg-slate-300 rounded-md mb-2 relative hover:scale-105 hover:cursor-pointer transition-all">
                                        <h1 className="p-1 w-1/3 text-center">{row.score}</h1>
                                        <h1 className="p-1 w-1/3 text-center">{row.weight}</h1>
                                    </div>
                        }) : <div></div>}
                    </div>

                    {error ? <h1 className="text-red-500 text-center">Error: {error}</h1>: <h1></h1>}

                    <div className="flex justify-center items-center gap-2 mt-2 mb-2">
                        <label htmlFor="score">Score</label>
                        <input id="score" className="w-1/2 rounded-md text-center" value={score} type="text" ref={scoreRef} placeholder="4/5" onChange={updateScore}/>
                        
                        <input id="weight" className="w-1/2 rounded-md text-center" value={weight} type="number" ref={weightRef} placeholder="20" onChange={updateWeight}/>
                        <label htmlFor="weight">Weight</label>
                    </div>
                    
                    <div className="flex justify-center gap-2 align-middle rounded-md">
                        <button className="bg-blue-400 p-1 rounded-md justify-center align-middle flex hover:scale-110 hover:cursor-pointer transition-all" onClick={updateRow}><span className="material-symbols-outlined">add</span></button>
                        <button className="bg-blue-400 p-1 rounded-md justify-center align-middle flex hover:scale-110 hover:cursor-pointer transition-all" onClick={removeRow}><span className="material-symbols-outlined">remove</span></button>
                        <button className="bg-blue-400 p-1 rounded-md justify-center align-middle flex hover:scale-110 hover:cursor-pointer transition-all" onClick={clear}><span className="material-symbols-outlined">cancel</span></button>
                        <button className="bg-blue-400 p-1 rounded-md justify-center align-middle flex hover:scale-110 hover:cursor-pointer transition-all" onClick={calculate}><span className="material-symbols-outlined">calculate</span></button>
                    </div>
                </div>

                {final != null ? 
                    <div className="bg-slate-200 p-4 rounded-md flex items-center justify-center flex-col">
                        <h1><strong>Results</strong></h1>
                        <h2>{final}/100</h2>
                    </div> : <div></div>
                }
                
            </motion.div>
        </AnimatePresence>
    )
}