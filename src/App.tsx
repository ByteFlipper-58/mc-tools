import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Github } from 'lucide-react';
import NavigationMenu from './components/ui/NavigationMenu';
import ThemeProvider from './components/ThemeProvider';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { initTelegramWebApp, useTelegramWebApp } from './lib/telegram';
import { useTranslation } from './lib/i18n';

// Lazy load components
const MainScreen = lazy(() => import('./components/MainScreen'));
const ServerStatusCheck = lazy(() => import('./components/ServerStatusCheck'));
const StrongholdFinder = lazy(() => import('./components/StrongholdFinder'));
const NetherCalculator = lazy(() => import('./components/NetherCalculator'));
const PlayerInfo = lazy(() => import('./components/PlayerInfo'));
const About = lazy(() => import('./components/About'));
const Settings = lazy(() => import('./components/Settings'));
const Privacy = lazy(() => import('./components/Privacy'));

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const webApp = useTelegramWebApp();
  const t = useTranslation();

  useEffect(() => {
    initTelegramWebApp();
  }, []);

  // Get safe area insets for Telegram Mini App
  const safeArea = webApp?.contentSafeAreaInset || { top: 0, right: 0, bottom: 0, left: 0 };

  const mainStyle = {
    paddingTop: webApp ? `${safeArea.top}px` : '1.5rem',
    paddingRight: `max(1.5rem, ${safeArea.right}px)`,
    paddingBottom: `max(1.5rem, ${safeArea.bottom}px)`,
    paddingLeft: `max(1.5rem, ${safeArea.left}px)`,
  };

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-light-100 dark:bg-dark-200 text-dark-200 dark:text-light-100 flex flex-col transition-colors">
          <NavigationMenu />

          <main className="container mx-auto flex-grow" style={mainStyle}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/server-status" element={<ServerStatusCheck />} />
                <Route path="/stronghold-finder" element={<StrongholdFinder />} />
                <Route path="/nether-calculator" element={<NetherCalculator />} />
                <Route path="/player-info" element={<PlayerInfo />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </Suspense>
          </main>

          <footer 
            className="bg-light-200 dark:bg-dark-300 rounded-t-3xl transition-colors"
            style={{
              paddingTop: '1.5rem',
              paddingRight: `max(1.5rem, ${safeArea.right}px)`,
              paddingBottom: `max(1.5rem, ${safeArea.bottom}px)`,
              paddingLeft: `max(1.5rem, ${safeArea.left}px)`,
            }}
          >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-muted-100 dark:text-light-300">
              <p>© {new Date().getFullYear()} MC Tools. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link 
                  to="/privacy" 
                  className="hover:text-accent-500 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/about" 
                  className="hover:text-accent-500 transition-colors duration-300"
                >
                  {t.common.about}
                </Link>
                <a
                  href="https://github.com/byteflipper-58/mc-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent-500 transition-colors duration-300"
                >
                  <Github className="w-5 h-5" />
                  {t.home.viewOnGithub}
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