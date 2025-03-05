import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wrench, Info } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';
import { useTelegramWebApp } from '../../lib/telegram';

function MobileNavigation() {
  const location = useLocation();
  const t = useTranslation();
  const webApp = useTelegramWebApp();
  
  const isToolsActive = location.pathname === '/' || 
    ['/server-status', '/stronghold-finder', '/nether-calculator', '/player-info'].includes(location.pathname);
  
  const isAboutActive = location.pathname === '/about' || 
    ['/privacy'].includes(location.pathname);

  // Get safe area insets for Telegram Mini App
  const safeArea = webApp?.contentSafeAreaInset || { bottom: 0 };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-dark-300 border-t border-dark-400 md:hidden z-50"
      style={{
        paddingBottom: `max(0px, ${safeArea.bottom}px)`
      }}
    >
      <div className="flex items-center justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center py-2 px-3 ${
            isToolsActive ? 'text-accent-500' : 'text-light-300'
          }`}
        >
          <Wrench className="w-5 h-5" />
          <span className="text-xs mt-1 font-minecraft">{t.common.tools}</span>
        </Link>
        
        <Link
          to="/about"
          className={`flex flex-col items-center py-2 px-3 ${
            isAboutActive ? 'text-accent-500' : 'text-light-300'
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-xs mt-1 font-minecraft">{t.common.about}</span>
        </Link>
      </div>
    </nav>
  );
}

export default MobileNavigation;