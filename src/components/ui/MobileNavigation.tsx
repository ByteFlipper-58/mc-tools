import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wrench, Settings, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';

function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const t = useTranslation();
  
  const isToolsActive = location.pathname === '/' || 
    ['/server-status', '/stronghold-finder', '/nether-calculator', '/player-info'].includes(location.pathname);
  
  const isSettingsActive = location.pathname === '/settings' || 
    ['/about', '/privacy'].includes(location.pathname);

  const showBackButton = location.pathname !== '/';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-300 border-t border-dark-400 md:hidden z-50">
      <div className="flex items-center justify-around">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="flex flex-col items-center py-3 px-5 text-light-300"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-xs mt-1 font-minecraft">{t.common.back || 'Back'}</span>
          </button>
        )}
        
        <Link
          to="/"
          className={`flex flex-col items-center py-3 px-5 ${
            isToolsActive ? 'text-accent-500' : 'text-light-300'
          }`}
        >
          <Wrench className="w-6 h-6" />
          <span className="text-xs mt-1 font-minecraft">{t.common.tools}</span>
        </Link>
        
        <Link
          to="/settings"
          className={`flex flex-col items-center py-3 px-5 ${
            isSettingsActive ? 'text-accent-500' : 'text-light-300'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1 font-minecraft">{t.common.settings}</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileNavigation;