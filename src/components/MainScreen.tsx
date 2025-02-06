import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Compass, Flame, User, Github, ArrowRight } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

function MainScreen() {
  return (
    <div className="min-h-[80vh] py-8">
      {/* Compact Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-minecraft mb-4 text-accent-500">
            Essential Minecraft Tools
          </h1>
          <p className="text-muted-100 dark:text-light-300 mb-6">
            A collection of free tools to enhance your Minecraft gameplay experience
          </p>
          <a
            href="https://github.com/byteflipper-58/mc-tools"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-100 dark:text-light-300 hover:text-accent-500 transition-colors"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
        </div>
      </div>

      {/* Featured Tools Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            to="/server-status"
            icon={<Server className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title="Server Status"
            description="Check the status of any Minecraft server in real-time. View player count, version info, and server details."
          />

          <FeatureCard
            to="/stronghold-finder"
            icon={<Compass className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title="Stronghold Finder"
            description="Locate strongholds easily by calculating their position using ender eye throws. Save locations for later."
          />

          <FeatureCard
            to="/nether-calculator"
            icon={<Flame className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title="Nether Calculator"
            description="Convert coordinates between Overworld and Nether dimensions for efficient portal linking."
          />

          <FeatureCard
            to="/player-info"
            icon={<User className="w-20 h-20 mb-6 text-accent-500 group-hover:scale-110 transition-transform" />}
            title="Player Info"
            description="Look up player information including UUID and skin renders. Download player skins directly."
          />
        </div>
      </div>

      {/* Features List */}
      <div className="bg-light-200 dark:bg-dark-300 py-12 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg transition-colors">
                  <div className="text-2xl font-minecraft text-accent-500 mb-2">Real-time</div>
                  <div className="text-muted-100 dark:text-light-300">Instant server status updates and player info</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg transition-colors">
                  <div className="text-2xl font-minecraft text-accent-500 mb-2">Accurate</div>
                  <div className="text-muted-100 dark:text-light-300">Precise calculations for coordinates and locations</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-light-100 dark:bg-dark-200 p-6 rounded-lg transition-colors">
                  <div className="text-2xl font-minecraft text-accent-500 mb-2">Free</div>
                  <div className="text-muted-100 dark:text-light-300">All tools are free and open source</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;