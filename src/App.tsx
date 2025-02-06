import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Github } from 'lucide-react';
import NavigationMenu from './components/ui/NavigationMenu';
import ServerStatusCheck from './components/ServerStatusCheck';
import StrongholdFinder from './components/StrongholdFinder';
import NetherCalculator from './components/NetherCalculator';
import PlayerInfo from './components/PlayerInfo';
import MainScreen from './components/MainScreen';
import About from './components/About';
import ThemeProvider from './components/ThemeProvider';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-light-100 dark:bg-dark-200 text-dark-200 dark:text-light-100 flex flex-col transition-colors">
          <NavigationMenu />

          <main className="container mx-auto p-6 md:p-8 flex-grow">
            <Routes>
              <Route path="/" element={<MainScreen />} />
              <Route path="/server-status" element={<ServerStatusCheck />} />
              <Route path="/stronghold-finder" element={<StrongholdFinder />} />
              <Route path="/nether-calculator" element={<NetherCalculator />} />
              <Route path="/player-info" element={<PlayerInfo />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>

          <footer className="bg-light-200 dark:bg-dark-300 p-6 mt-8 rounded-t-3xl transition-colors">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-muted-100 dark:text-light-300">
              <p>© 2024 MC Tools. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link 
                  to="/about" 
                  className="hover:text-accent-500 transition-colors duration-300"
                >
                  About
                </Link>
                <a
                  href="https://github.com/byteflipper-58/mc-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent-500 transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;