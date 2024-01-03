import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import './index.css'

import AnimatedRoutes from './components/AnimatedRoutes'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className='p-2 flex flex-col items-center justify-center flex-wrap h-full'>
      <Router>
        <header className='w-36 bg-slate-200 rounded-md shadow-lg'>
          <Navigation />
        </header>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App
