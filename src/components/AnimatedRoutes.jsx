import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Calculator from '../pages/Calculator'

export default function AnimatedRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/calculator' element={<Calculator />} />
        </Routes>
    )
}