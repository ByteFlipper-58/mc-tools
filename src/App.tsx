import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SidebarNavigation from './components/ui/SidebarNavigation';
import MobileNavigation from './components/ui/MobileNavigation';
import MobileHeader from './components/ui/MobileHeader';
import ThemeProvider from './components/ThemeProvider';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { initTelegramWebApp, useTelegramWebApp } from './lib/telegram';
import { useTranslation } from './lib/i18n';
import { logAnalyticsEvent } from './lib/firebase';

// Lazy load components
const MainScreen = lazy(() => import('./views/MainScreen'));
const ServerStatusCheck = lazy(() => import('./views/ServerStatusCheck'));
const StrongholdFinder = lazy(() => import('./views/StrongholdFinder'));
const NetherCalculator = lazy(() => import('./views/NetherCalculator'));
const PlayerInfo = lazy(() => import('./views/PlayerInfo'));
const About = lazy(() => import('./views/About'));
const Settings = lazy(() => import('./views/Settings'));
const Privacy = lazy(() => import('./views/Privacy'));

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Log page view
    logAnalyticsEvent('page_view', {
      page_path: pathname,
      page_title: pathname.substring(1) || 'home'
    });
  }, [pathname]);

  return null;
}

function App() {
  const webApp = useTelegramWebApp();
  const t = useTranslation();
  const isTelegram = !!webApp;

  useEffect(() => {
    try {
      initTelegramWebApp();
      
      // Log platform info
      logAnalyticsEvent('app_platform', {
        is_telegram: isTelegram,
        platform: isTelegram ? 'telegram' : 'web'
      });
    } catch (error) {
      console.error("Failed to initialize Telegram Web App:", error);
    }
  }, [isTelegram]);

  // Get safe area insets for Telegram Mini App
  const safeArea = webApp?.contentSafeAreaInset || { top: 0, right: 0, bottom: 0, left: 0 };

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-dark-200 text-light-100 flex flex-col transition-colors">
          <MobileHeader />
          <SidebarNavigation />

          <main 
            className={`flex-grow ${!isTelegram ? 'md:ml-64' : ''}`}
            style={{
              paddingTop: isTelegram ? `${safeArea.top + 16}px` : '1.5rem',
              paddingRight: `max(1.5rem, ${safeArea.right}px)`,
              paddingBottom: `max(1.5rem, ${safeArea.bottom}px)`,
              paddingLeft: `max(1.5rem, ${safeArea.left}px)`,
            }}
          >
            <div className="container mx-auto px-4 max-w-[125%]">
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
            </div>
          </main>

          <MobileNavigation />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;