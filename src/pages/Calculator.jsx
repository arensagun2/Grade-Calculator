import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react"

export default function Calculator() {
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(true);
    const [final, setFinal] = useState("");
    const [letterGrade, setLetterGrade] = useState("");

    let grades = [
        {id: "1g", val: useRef()},
        {id: "2g", val: useRef()},
        {id: "3g", val: useRef()},
        {id: "4g", val: useRef()},
        {id: "5g", val: useRef()},
        {id: "6g", val: useRef()},
        {id: "7g", val: useRef()},
        {id: "8g", val: useRef()},
        {id: "9g", val: useRef()},
        {id: "10g", val: useRef()},
    ]

    let weights = [
        {id: "1w", val: useRef()},
        {id: "2w", val: useRef()},
        {id: "3w", val: useRef()},
        {id: "4w", val: useRef()},
        {id: "5w", val: useRef()},
        {id: "6w", val: useRef()},
        {id: "7w", val: useRef()},
        {id: "8w", val: useRef()},
        {id: "9w", val: useRef()},
        {id: "10w", val: useRef()},
    ]

    const calculate = (e) => {
        e.preventDefault();
        let sumWeights = 0;
        for (let i = 0; i < weights.length; i++) {
            if (!weights[0].val.current.value) {
                weights[0].val.current = 0;
            };
            const toParse = parseInt(weights[i].val.current.value)
            if (toParse) {
                sumWeights += toParse;
            }
            
        }
        if (sumWeights > 100 || sumWeights < 100) {
            setErrorMessage("Weights should sum up to a 100")
            setError(true);
        } else {
            let finals = [];
            for (let i = 0; i < grades.length; i++) {
                let current = grades[i].val.current
                let val = current.value
                let splitNum = val.split("/")
                let firstNumber = parseFloat(splitNum[0])
                let secondNumber = parseInt(splitNum[1])
                let currentWeight = parseInt(weights[i].val.current.value)
                // Checks if there is no current grade value then breaks loop to calculate
                if (val === "") {
                    current = "1/1"
                    val = current.value
                    splitNum = val.split("/")
                    firstNumber = parseFloat(splitNum[0])
                    secondNumber = parseInt(splitNum[1])
                    currentWeight = parseInt(weights[i].val.current.value)
                }
                // Checks if the length of splitted number is 2, which means two numbers at the left of '/' and vice versa
                if (splitNum.length < 2) {
                    console.log(splitNum);
                    setErrorMessage("Scores should be entered like '28/30'")
                    setError(true)
                    return;
                } else if (val !== "") {
                    if (!currentWeight) {
                        setErrorMessage("There should be a corresponding weight for each score")
                        setError(true)
                        return;
                    } else {
                        // Checks if current are numbers. Scores and Weights
                        if (!firstNumber || !secondNumber || !currentWeight) {
                            setErrorMessage("This should be all numbers")
                            setError(true)
                            return;
                        }
                        if (firstNumber > secondNumber) {
                            setError(true)
                            setErrorMessage("First number should be lower or equal than the second number for scores");
                            return;
                        }
                        let sendFinal = (firstNumber / secondNumber) * parseInt(weights[i].val.current.value)
                        finals.push(Math.round(sendFinal * 100) / 100);
                    } 
                }
            }

            // Adds all calculated scores with weights (Calculation: (actualScore / maximumScore) * weight)
            let finalMsg = 0;
            for (let i = 0; i < finals.length; i++) {
                finalMsg += finals[i];
            }

            // Identifies Letter Grade
            if (finalMsg > 95) {
                setLetterGrade("A+")
            } else if (finalMsg === 95) {
                setLetterGrade("A-")
            } else if (finalMsg >= 90) {
                setLetterGrade("A-")
            } else if (finalMsg > 85) {
                setLetterGrade("B+")
            } else if (finalMsg === 85) {
                setLetterGrade("B")
            } else if (finalMsg >= 80) {
                setLetterGrade("B-")
            } else if (finalMsg > 75) {
                setLetterGrade("C+")
            } else if (finalMsg === 75) {
                setLetterGrade("C")
            } else if (finalMsg >= 70) {
                setLetterGrade("C-")
            } else if (finalMsg > 65) {
                setLetterGrade("D+")
            } else if (finalMsg === 65) {
                setLetterGrade("D")
            } else if (finalMsg >= 60) {
                setLetterGrade("D-")
            } else {
                setLetterGrade("F")
            }

            // Sets the final number
            setError(false);
            setFinal(finalMsg.toString());
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
                <div className="p-2 flex flex-col flex-wrap items-center relative">
                    <div action="" className="flex flex-row relative flex-wrap w-full gap-5 mt-5 items-center justify-center transition-all">
                        <form onSubmit={calculate} className="w-[300px] flex flex-col gap-2 items-center justify-center bg-slate-200 rounded-md shadow-lg hover:scale-105 transition-all">
                            <h1 className="mt-4 text-2xl">Grade:</h1>
                            <div className="flex items-center justify-center p-1 gap-2">
                                <div className="w-1/2 flex flex-col gap-2 items-center justify-center">
                                    <h1>Scores</h1>
                                    <h2>eg. 68/100</h2>
                                    {grades.map(grade => <input type="text" key={grade.id} ref={grade.val} placeholder={grade.id === "1g" ? '20/30' : ''} className="text-black text-center w-2/3 rounded-sm p-0.5" />)}
                                </div>
                                <div className="w-1/2 flex flex-col gap-2 items-center justify-center">
                                    <h1>Weights</h1>
                                    <h2>eg. 20</h2>
                                    {weights.map(weight => <input type="text" key={weight.id} ref={weight.val} placeholder={weight.id === "1w" ? '40' : ''} className="text-black text-center w-2/3 rounded-sm p-0.5" />)}
                                </div>
                            </div>
                            <div>
                                <input type="submit" value={"Calculate"} className="p-2 shadow-md bg-green-500 m-2 rounded-md hover:scale-110 transition-all hover:cursor-pointer" />
                            </div>
                        </form>
                        <div className="w-[300px] flex flex-col p-4 items-center justify-center rounded-md bg-slate-200 h-auto hover:scale-105 transition-all hover:cursor-default">
                            <h1 className="text-2xl">Results:</h1>
                            {error ? 
                                <p><b>{errorMessage}</b></p> 
                                : 
                                <div>
                                    <p>Final Number Grade: <b>{final}</b></p>
                                    <p>Final Grade: <b>{letterGrade}</b></p>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}