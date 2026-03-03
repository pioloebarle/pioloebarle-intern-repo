import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EffectComponent from './components/EffectComponent'
import MemoComponent from './components/MemoComponent'
import CallbackComponent from './components/CallbackComponent'
import TestAPI from './components/TestAPI'
import Counter from './components/Counter'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/effect" element={<EffectComponent />} />
          <Route path="/memo" element={<MemoComponent />} />
          <Route path="/callback" element={<CallbackComponent />} />
          <Route path="/axios" element={<TestAPI />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
