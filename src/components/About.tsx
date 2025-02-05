import React from 'react';
import { Github, Heart, Code2, Coffee, Globe, Database, Shield, Zap } from 'lucide-react';

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#1A1C1E] rounded-2xl p-12 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20" />
        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl font-minecraft mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
            About MC Tools
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive suite of tools designed to enhance your Minecraft gameplay experience,
            built with modern web technologies and a focus on user experience.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Project Description */}
        <div className="bg-[#2C2F33] p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-minecraft text-emerald-400">About the Project</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              MC Tools is an open-source project dedicated to providing essential utilities for both casual
              players and server administrators. Our tools are designed to be intuitive, accurate, and reliable.
            </p>
            <p>
              Built with modern web technologies and licensed under the GNU General Public License v3.0,
              MC Tools ensures that the community can freely use, modify, and distribute these tools while
              maintaining the same freedoms for others.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-[#2C2F33] p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-minecraft text-emerald-400">Technology Stack</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-[#1A1C1E] p-4 rounded-lg">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">React + TypeScript</span>
            </div>
            <div className="flex items-center gap-3 bg-[#1A1C1E] p-4 rounded-lg">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-3 bg-[#1A1C1E] p-4 rounded-lg">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Firebase Analytics</span>
            </div>
            <div className="flex items-center gap-3 bg-[#1A1C1E] p-4 rounded-lg">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Vite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-[#2C2F33] p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-minecraft text-emerald-400 mb-6">Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Server Status Checker',
              description: 'Monitor the status of any Minecraft server in real-time, including player count, version, and MOTD.',
            },
            {
              title: 'Stronghold Finder',
              description: 'Calculate stronghold locations accurately using ender eye throws with our mathematical algorithm.',
            },
            {
              title: 'Nether Calculator',
              description: 'Convert coordinates between Overworld and Nether dimensions for efficient portal linking.',
            },
            {
              title: 'Player Info',
              description: 'Look up player information including UUID and skin renders using official APIs.',
            },
          ].map((feature, index) => (
            <div key={index} className="bg-[#1A1C1E] p-6 rounded-lg">
              <h3 className="text-xl font-minecraft mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Developer & Support */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Developer Info */}
        <div className="bg-[#2C2F33] p-8 rounded-xl">
          <h2 className="text-2xl font-minecraft text-emerald-400 mb-6">Developer</h2>
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-xl font-minecraft">ByteFlipper</h3>
              <p className="text-gray-400">Developer & Maintainer</p>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/byteflipper-58"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Code2 className="w-5 h-5" />
                Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-[#2C2F33] p-8 rounded-xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-400" />
            <h2 className="text-2xl font-minecraft text-emerald-400">Support the Project</h2>
          </div>
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              If you find MC Tools useful, consider supporting the project by:
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/byteflipper-58/mc-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Star on GitHub
              </a>
              <a
                href="https://ko-fi.com/byteflipper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors group"
              >
                <Coffee className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Buy me a coffee
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Credits */}
      <div className="bg-[#2C2F33] p-8 rounded-xl">
        <h2 className="text-2xl font-minecraft text-emerald-400 mb-6">API Credits</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1A1C1E] p-6 rounded-lg">
            <h3 className="font-minecraft mb-3">Ashcon API</h3>
            <p className="text-gray-400 mb-4">Player data and UUID lookup service</p>
            <a
              href="https://github.com/Electroid/mojang-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
            >
              View Documentation →
            </a>
          </div>
          <div className="bg-[#1A1C1E] p-6 rounded-lg">
            <h3 className="font-minecraft mb-3">Mineatar API</h3>
            <p className="text-gray-400 mb-4">High-quality skin rendering service</p>
            <a
              href="https://github.com/mineatar/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
            >
              View Documentation →
            </a>
          </div>
          <div className="bg-[#1A1C1E] p-6 rounded-lg">
            <h3 className="font-minecraft mb-3">MCStatus API</h3>
            <p className="text-gray-400 mb-4">Server status information provider</p>
            <a
              href="https://api.mcstatus.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
            >
              View Documentation →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;