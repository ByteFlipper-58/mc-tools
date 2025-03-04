import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Server, Compass, Flame, User, Settings, Info } from 'lucide-react';
import MCToolsLogo from './MCToolsLogo';
import { useTranslation } from '../../lib/i18n';
import { useTelegramWebApp } from '../../lib/telegram';

function SidebarNavigation() {
  const location = useLocation();
  const t = useTranslation();
  const webApp = useTelegramWebApp();
  
  // Don't render the sidebar if we're in Telegram
  if (webApp) {
    return null;
  }
  
  const navItems = [
    { to: '/server-status', icon: Server, label: t.nav.serverStatus },
    { to: '/stronghold-finder', icon: Compass, label: t.nav.strongholdFinder },
    { to: '/nether-calculator', icon: Flame, label: t.nav.netherCalculator },
    { to: '/player-info', icon: User, label: t.nav.playerInfo },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex flex-col h-screen bg-dark-300 w-64 border-r border-dark-400 fixed left-0 top-0 z-50">
      {/* Logo and App Name */}
      <Link to="/" className="flex items-center gap-3 p-6 border-b border-dark-400">
        <div className="bg-dark-400/50 p-1.5 rounded-lg transition-colors">
          <MCToolsLogo />
        </div>
        <span className="text-xl font-minecraft text-light-100">MC Tools</span>
      </Link>
      
      {/* Navigation Items */}
      <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-4">
          <h3 className="text-xs uppercase text-light-300 font-semibold tracking-wider px-3">
            {t.common.tools}
          </h3>
        </div>
        
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive(item.to)
                  ? 'bg-accent-500/10 text-accent-500'
                  : 'text-light-100 hover:bg-dark-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-minecraft text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* About and Settings at the bottom */}
      <div className="p-4 border-t border-dark-400 space-y-2">
        <Link
          to="/about"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
            isActive('/about')
              ? 'bg-accent-500/10 text-accent-500'
              : 'text-light-100 hover:bg-dark-400'
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="font-minecraft text-sm">{t.common.about}</span>
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
            isActive('/settings')
              ? 'bg-accent-500/10 text-accent-500'
              : 'text-light-100 hover:bg-dark-400'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-minecraft text-sm">{t.common.settings}</span>
        </Link>
      </div>
    </div>
  );
}

export default SidebarNavigation;