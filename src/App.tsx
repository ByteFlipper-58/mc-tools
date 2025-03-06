import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

// Animated page wrapper
function AnimatedPage({ children }: { children: React.ReactNode }) {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -10
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

// Animated routes wrapper
function AnimatedRoutes() {
  const location = useLocation();
  const t = useTranslation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AnimatedPage>
            <MainScreen />
          </AnimatedPage>
        } />
        <Route path="/server-status" element={
          <AnimatedPage>
            <ServerStatusCheck />
          </AnimatedPage>
        } />
        <Route path="/stronghold-finder" element={
          <AnimatedPage>
            <StrongholdFinder />
          </AnimatedPage>
        } />
        <Route path="/nether-calculator" element={
          <AnimatedPage>
            <NetherCalculator />
          </AnimatedPage>
        } />
        <Route path="/player-info" element={
          <AnimatedPage>
            <PlayerInfo />
          </AnimatedPage>
        } />
        <Route path="/about" element={
          <AnimatedPage>
            <About />
          </AnimatedPage>
        } />
        <Route path="/settings" element={
          <AnimatedPage>
            <Settings />
          </AnimatedPage>
        } />
        <Route path="/privacy" element={
          <AnimatedPage>
            <Privacy />
          </AnimatedPage>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const webApp = useTelegramWebApp();
  const t = useTranslation();
  const isTelegram = !!webApp;

  React.useEffect(() => {
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
        <div className="min-h-screen bg-dark-200 text-light-100 flex flex-col transition-colors">
          <MobileHeader />
          <SidebarNavigation />

          <main 
            className={`flex-grow ${!isTelegram ? 'md:ml-64' : ''}`}
            style={{
              paddingTop: isTelegram ? `${safeArea.top}px` : '0.75rem',
              paddingRight: `${safeArea.right}px`,
              paddingBottom: `${safeArea.bottom}px`,
              paddingLeft: `${safeArea.left}px`,
            }}
          >
            <div className="container mx-auto px-2 sm:px-4">
              <Suspense fallback={<LoadingSpinner />}>
                <AnimatedRoutes />
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