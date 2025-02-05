import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import NavigationMenu from './components/ui/NavigationMenu';
import ServerStatusCheck from './components/ServerStatusCheck';
import StrongholdFinder from './components/StrongholdFinder';
import NetherCalculator from './components/NetherCalculator';
import PlayerInfo from './components/PlayerInfo';
import MainScreen from './components/MainScreen';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1A1C1E] text-gray-100 flex flex-col">
        <NavigationMenu />

        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/server-status" element={<ServerStatusCheck />} />
            <Route path="/stronghold-finder" element={<StrongholdFinder />} />
            <Route path="/nether-calculator" element={<NetherCalculator />} />
            <Route path="/player-info" element={<PlayerInfo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="bg-[#2C2F33] p-4 mt-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400">
            <p>© 2024 MC Tools. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/about" className="hover:text-emerald-400 transition-colors">
                About
              </Link>
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;