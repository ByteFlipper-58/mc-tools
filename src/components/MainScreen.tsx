import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Compass, Flame, User, Github } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

function MainScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-minecraft mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
          MC Tools
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A collection of essential tools for Minecraft players. Check server status,
          find strongholds, calculate nether coordinates, and view player information.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full mb-16">
        <FeatureCard
          to="/server-status"
          icon={<Server className="w-16 h-16 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
          title="Server Status"
          description="Check the status of any Minecraft server in real-time"
        />

        <FeatureCard
          to="/stronghold-finder"
          icon={<Compass className="w-16 h-16 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
          title="Stronghold Finder"
          description="Calculate stronghold locations using ender eye throws"
        />

        <FeatureCard
          to="/nether-calculator"
          icon={<Flame className="w-16 h-16 mb-4 text-red-400 group-hover:scale-110 transition-transform" />}
          title="Nether Calculator"
          description="Convert coordinates between Overworld and Nether"
        />

        <FeatureCard
          to="/player-info"
          icon={<User className="w-16 h-16 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
          title="Player Info"
          description="View player information, UUID, and skin renders"
        />
      </div>

      <div className="text-center">
        <div className="bg-[#2C2F33] p-6 rounded-lg">
          <h2 className="text-xl font-minecraft mb-4">About MC Tools</h2>
          <p className="text-gray-400 mb-4">
            Developed by ByteFlipper • Licensed under GPL-3.0
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/byteflipper-58/mc-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;