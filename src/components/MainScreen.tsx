import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Compass, Flame, User, Github, ArrowRight } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

function MainScreen() {
  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#1A1C1E] py-24 mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl font-minecraft mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
              MC Tools
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Your essential toolkit for Minecraft adventures. From finding strongholds to managing portals,
              we've got everything you need to enhance your gameplay.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/server-status"
                className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg font-minecraft transition-colors inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2C2F33] hover:bg-[#34373C] px-8 py-3 rounded-lg font-minecraft transition-colors inline-flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-minecraft text-center mb-12 text-emerald-400">
          Essential Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            to="/server-status"
            icon={<Server className="w-16 h-16 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
            title="Server Status"
            description="Check the status of any Minecraft server in real-time with detailed information"
          />

          <FeatureCard
            to="/stronghold-finder"
            icon={<Compass className="w-16 h-16 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
            title="Stronghold Finder"
            description="Calculate stronghold locations accurately using ender eye throws"
          />

          <FeatureCard
            to="/nether-calculator"
            icon={<Flame className="w-16 h-16 mb-4 text-red-400 group-hover:scale-110 transition-transform" />}
            title="Nether Calculator"
            description="Convert coordinates between Overworld and Nether dimensions"
          />

          <FeatureCard
            to="/player-info"
            icon={<User className="w-16 h-16 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
            title="Player Info"
            description="View player information, UUID, and high-quality skin renders"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#2C2F33] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-minecraft text-emerald-400 mb-2">100%</div>
              <div className="text-gray-400">Free & Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-minecraft text-emerald-400 mb-2">4+</div>
              <div className="text-gray-400">Essential Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-minecraft text-emerald-400 mb-2">24/7</div>
              <div className="text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;