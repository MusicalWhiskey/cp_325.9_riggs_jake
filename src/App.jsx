import { Routes, Route } from 'react-router-dom'

import CoffeePage from './pages/CoffeePage.jsx'
import GamePage from './pages/GamePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import StartPage from './pages/StartPage.jsx'
import ScoresPage from './pages/ScoresPage.jsx'

import NavBar from './components/NavBar.jsx'

// import './App.css'

export default function App() {
  return (
    <main>
      <NavBar />
            <Routes>
                <Route path="/game" element={<GamePage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/scores" element={<ScoresPage />} />
                <Route path="/" element={<StartPage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
    </main>
  );
}