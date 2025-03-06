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

  return (
    <nav className="mobile-nav">
      <div className="h-14 flex items-center justify-around">
        <Link
          to="/"
          className={`mobile-nav-item ${isToolsActive ? 'active' : ''}`}
        >
          <Wrench className="w-5 h-5" />
          <span className="text-xs font-minecraft">{t.common.tools}</span>
        </Link>
        
        <Link
          to="/about"
          className={`mobile-nav-item ${isAboutActive ? 'active' : ''}`}
        >
          <Info className="w-5 h-5" />
          <span className="text-xs font-minecraft">{t.common.about}</span>
        </Link>
      </div>
    </nav>
  );
}

export default MobileNavigation;