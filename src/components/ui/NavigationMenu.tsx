import React, { useState, useEffect, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Server, Compass, Flame, User, Info } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import MCToolsLogo from './MCToolsLogo';
import { useTranslation } from '../../lib/i18n';
import { useTelegramWebApp } from '../../lib/telegram';

const tools = [
  { to: '/server-status', icon: Server, labelKey: 'nav.serverStatus' },
  { to: '/stronghold-finder', icon: Compass, labelKey: 'nav.strongholdFinder' },
  { to: '/nether-calculator', icon: Flame, labelKey: 'nav.netherCalculator' },
  { to: '/player-info', icon: User, labelKey: 'nav.playerInfo' },
] as const;

const NavigationMenu = memo(function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const t = useTranslation();
  const webApp = useTelegramWebApp();

  // Get safe area insets for Telegram Mini App
  const safeArea = webApp?.contentSafeAreaInset || { top: 0, right: 0, bottom: 0, left: 0 };

  useEffect(() => {
    setIsOpen(false);
    setIsToolsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navStyle = {
    paddingTop: `max(1.5rem, ${safeArea.top}px)`,
    paddingRight: `max(1.5rem, ${safeArea.right}px)`,
    paddingBottom: '1.5rem',
    paddingLeft: `max(1.5rem, ${safeArea.left}px)`,
  };

  return (
    <nav 
      className="bg-light-200 dark:bg-dark-300 shadow-lg rounded-b-3xl transition-colors sticky top-0 z-50"
      style={navStyle}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-minecraft flex items-center gap-3 hover:text-accent-500 transition-colors duration-300"
          >
            <div className="bg-light-100 dark:bg-dark-200 p-2 rounded-full transition-colors">
              <MCToolsLogo />
            </div>
            <span className="hidden sm:inline">MC Tools</span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-100 dark:text-light-300 hover:text-accent-500 transition-colors duration-300"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6" ref={menuRef}>
            <div className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-2 hover:text-accent-500 transition-colors duration-300"
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
              >
                {t.common.tools}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop dropdown */}
              <div 
                className={`absolute right-0 mt-4 w-56 bg-light-200 dark:bg-dark-300 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform origin-top ${
                  isToolsOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
                }`}
                role="menu"
              >
                {tools.map((tool) => (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    className="flex items-center gap-3 px-6 py-4 hover:bg-light-300 dark:hover:bg-dark-400 transition-colors duration-300"
                    role="menuitem"
                  >
                    <tool.icon className="w-5 h-5" />
                    {t[tool.labelKey]}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about"
              className="flex items-center gap-2 hover:text-accent-500 transition-colors duration-300"
            >
              <Info className="w-5 h-5" />
              {t.common.about}
            </Link>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 transform ${
            isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
          } overflow-hidden`}
          role="menu"
        >
          <div className="pt-4 pb-3 space-y-1">
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-light-300 dark:hover:bg-dark-400 rounded-xl transition-colors duration-300"
              aria-expanded={isToolsOpen}
              aria-haspopup="true"
            >
              {t.common.tools}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile tools dropdown */}
            <div 
              className={`transition-all duration-300 transform ${
                isToolsOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
              } overflow-hidden`}
              role="menu"
            >
              {tools.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-light-300 dark:hover:bg-dark-400 rounded-xl transition-colors duration-300"
                  role="menuitem"
                >
                  <tool.icon className="w-5 h-5" />
                  {t[tool.labelKey]}
                </Link>
              ))}
            </div>
            <Link
              to="/about"
              className="flex items-center gap-3 px-4 py-3 hover:bg-light-300 dark:hover:bg-dark-400 rounded-xl transition-colors duration-300"
              role="menuitem"
            >
              <Info className="w-5 h-5" />
              {t.common.about}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default NavigationMenu;