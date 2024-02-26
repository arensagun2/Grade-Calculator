import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Firebase
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCUKiB4rcX5_qKKe3nlumPWScUDEjoPmJE",
  authDomain: "arens4gun2.firebaseapp.com",
  projectId: "arens4gun2",
  storageBucket: "arens4gun2.appspot.com",
  messagingSenderId: "890362268601",
  appId: "1:890362268601:web:d88d9e9259dfd1b0e44468",
  measurementId: "G-H4EKREHKK4"
};

// Initialize Firebase and database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
    const [likes, setlikes] = useState(0);

    useEffect(() => {
        const updateLikes = onSnapshot(doc(db, "likes", "likes"), (doc) => {
            setlikes(doc.data().total);
        })

        return () => updateLikes();
    }, []);

    const addLike = async () => {
        await updateDoc(doc(db, "likes", "likes"), {
            total: likes + 1
        })
    }
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
                <div className="flex justify-center items-center gap-2 p-4">
                    <button className="bg-green-200 p-3 rounded-full flex hover:scale-110 transition-all" onClick={addLike}>
                        <span className="material-symbols-outlined">thumb_up</span>
                    </button>
                    <p>{likes}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}