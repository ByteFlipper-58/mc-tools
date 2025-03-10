import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, ArrowLeft } from 'lucide-react';
import MCToolsLogo from './MCToolsLogo';
import { useTranslation } from '../../lib/i18n';
import { useTelegramWebApp } from '../../lib/telegram';

function MobileHeader() {
  const t = useTranslation();
  const webApp = useTelegramWebApp();
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = location.pathname !== '/';

  // Don't render the header if we're in Telegram
  if (webApp) {
    return null;
  }

  return (
    <header className="bg-dark-300 p-4 md:hidden sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between">
        {showBackButton ? (
          <button
            onClick={() => navigate(-1)}
            className="text-light-300 hover:text-accent-500 transition-colors"
            aria-label={t.common.back}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-dark-400/50 p-1.5 rounded-lg transition-colors">
              <MCToolsLogo />
            </div>
            <span className="font-minecraft text-light-100">MC Tools</span>
          </Link>
        )}
        
        <Link 
          to="/settings"
          className="p-2 rounded-lg hover:bg-dark-400 transition-colors"
          aria-label={t.common.settings}
        >
          <Settings className="w-6 h-6 text-light-300" />
        </Link>
      </div>
    </header>
  );
}

export default MobileHeader;