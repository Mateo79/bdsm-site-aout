import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AgeGate from './components/AgeGate'
import Home from './pages/Home'
import DeposerAnnonce from './pages/DeposerAnnonce'
import Annonces from './pages/Annonces'
import AnnonceDetail from './pages/AnnonceDetail'
import Textes from './pages/Textes'
import TexteDetail from './pages/TexteDetail'
import Conseils from './pages/Conseils'
import Chat from './pages/Chat'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-violet-100 text-stone-900">
      <AgeGate />
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deposer-une-annonce" element={<DeposerAnnonce />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/annonces/:id" element={<AnnonceDetail />} />
          <Route path="/textes" element={<Textes />} />
          <Route path="/textes/:id" element={<TexteDetail />} />
          <Route path="/conseils" element={<Conseils />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>

      <footer className="pb-10 text-center text-sm text-stone-500">
        Espace bienveillant - rencontres, textes et conseils entre adultes consentants.
      </footer>
    </div>
  )
}
