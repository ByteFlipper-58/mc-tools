import React from 'react';
import { Github, Heart, Code2, Coffee } from 'lucide-react';

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-minecraft mb-8 text-center">About MC Tools</h1>

      <div className="space-y-8">
        {/* Project Description */}
        <div className="bg-[#2C2F33] p-6 rounded-lg">
          <h2 className="text-xl font-minecraft mb-4 text-emerald-400">About the Project</h2>
          <p className="text-gray-300 mb-4">
            MC Tools is a comprehensive collection of utilities designed to enhance your Minecraft gameplay experience.
            Built with modern web technologies, it provides essential tools for both casual players and server administrators.
          </p>
          <p className="text-gray-300">
            This project is open source and licensed under the GNU General Public License v3.0, allowing anyone to use,
            modify, and distribute the code freely while maintaining the same freedoms for others.
          </p>
        </div>

        {/* Features */}
        <div className="bg-[#2C2F33] p-6 rounded-lg">
          <h2 className="text-xl font-minecraft mb-4 text-emerald-400">Features</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <div className="mt-1">•</div>
              <div>
                <strong className="text-white">Server Status Checker</strong>
                <p>Monitor the status of any Minecraft server in real-time, including player count, version, and MOTD.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1">•</div>
              <div>
                <strong className="text-white">Stronghold Finder</strong>
                <p>Calculate stronghold locations accurately using ender eye throws with our mathematical algorithm.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1">•</div>
              <div>
                <strong className="text-white">Nether Calculator</strong>
                <p>Convert coordinates between Overworld and Nether dimensions for efficient portal linking.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1">•</div>
              <div>
                <strong className="text-white">Player Info</strong>
                <p>Look up player information including UUID and skin renders using Mojang's official API.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Technologies */}
        <div className="bg-[#2C2F33] p-6 rounded-lg">
          <h2 className="text-xl font-minecraft mb-4 text-emerald-400">Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">React + TypeScript</span>
            </div>
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Vite</span>
            </div>
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Lucide Icons</span>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="bg-[#2C2F33] p-6 rounded-lg">
          <h2 className="text-xl font-minecraft mb-4 text-emerald-400">Developer</h2>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <h3 className="text-lg font-minecraft">ByteFlipper</h3>
              <p className="text-gray-400">Developer & Maintainer</p>
            </div>
            <div className="flex gap-4">
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
        <div className="bg-[#2C2F33] p-6 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-minecraft">Support the Project</h2>
          </div>
          <p className="text-gray-300 mb-4">
            If you find MC Tools useful, consider supporting the project by:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/byteflipper-58/mc-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              Star on GitHub
            </a>
            <a
              href="https://ko-fi.com/byteflipper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Coffee className="w-5 h-5" />
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;