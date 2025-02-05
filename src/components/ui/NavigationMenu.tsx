import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Server, Compass, Flame, User, Info } from 'lucide-react';

function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const tools = [
    { to: '/server-status', icon: Server, label: 'Server Status' },
    { to: '/stronghold-finder', icon: Compass, label: 'Stronghold Finder' },
    { to: '/nether-calculator', icon: Flame, label: 'Nether Calculator' },
    { to: '/player-info', icon: User, label: 'Player Info' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsToolsOpen(false);
    }
  };

  return (
    <nav className="bg-[#2C2F33] p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-minecraft flex items-center gap-2">
            MC Tools
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative group">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                Tools
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Desktop dropdown */}
              <div className={`absolute right-0 mt-2 w-48 bg-[#2C2F33] rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${isToolsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {tools.map((tool) => (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    onClick={() => setIsToolsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#34373C] transition-colors"
                  >
                    <tool.icon className="w-5 h-5" />
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about"
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <Info className="w-5 h-5" />
              About
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-200 ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-[#34373C] transition-colors"
            >
              Tools
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile tools dropdown */}
            <div className={`transition-all duration-200 ${isToolsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {tools.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  onClick={() => {
                    setIsOpen(false);
                    setIsToolsOpen(false);
                  }}
                  className="flex items-center gap-3 px-6 py-2 hover:bg-[#34373C] transition-colors"
                >
                  <tool.icon className="w-5 h-5" />
                  {tool.label}
                </Link>
              ))}
            </div>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#34373C] transition-colors"
            >
              <Info className="w-5 h-5" />
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;