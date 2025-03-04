import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Compass, Flame, User, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';

function ToolsList() {
  const t = useTranslation();
  
  const tools = [
    { 
      to: '/server-status', 
      icon: Server, 
      title: t.nav.serverStatus, 
      description: t.server.title 
    },
    { 
      to: '/stronghold-finder', 
      icon: Compass, 
      title: t.nav.strongholdFinder, 
      description: t.nav.strongholdFinder 
    },
    { 
      to: '/nether-calculator', 
      icon: Flame, 
      title: t.nav.netherCalculator, 
      description: t.nav.netherCalculator 
    },
    { 
      to: '/player-info', 
      icon: User, 
      title: t.nav.playerInfo, 
      description: t.nav.playerInfo 
    },
  ];

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <Link
          key={tool.to}
          to={tool.to}
          className="flex items-center justify-between p-4 bg-dark-300 rounded-lg hover:bg-dark-400 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent-500/10 p-3 rounded-lg">
              <tool.icon className="w-6 h-6 text-accent-500" />
            </div>
            <div>
              <h3 className="font-minecraft text-light-100">{tool.title}</h3>
              <p className="text-sm text-light-300">{tool.description}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-light-300" />
        </Link>
      ))}
    </div>
  );
}

export default ToolsList;