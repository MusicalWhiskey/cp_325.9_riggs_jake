import react from 'react'

import { Routes, Route } from 'react-router-dom'

import CoffeePage from './pages/DonatePage.jsx'
import GamePage from './pages/GamePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import UserPage from './pages/UserPage.jsx'
import ScoresPage from './pages/ScoresPage.jsx'

import NavBar from './components/NavBar.jsx'

import './App.css'
import DonatePage from './pages/DonatePage.jsx'

export default function App() {
  return (
    <main className="app-container">
      <NavBar />
            <Routes>
                <Route path="/" element={<UserPage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/scores" element={<ScoresPage />} />
                <Route path="/donate" element={<DonatePage />} />

                <Route path="*" element={<NotFoundPage />} />
                
            </Routes>

    </main>
  );
}