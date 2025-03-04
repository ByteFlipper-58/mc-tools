import React from 'react';
import { Shield, Lock, Eye, Database, Globe } from 'lucide-react';
import { useTelegramBackButton } from '../lib/telegram';

function Privacy() {
  // Enable Telegram back button
  useTelegramBackButton(true);
  
  return (
    <div className="max-w-4xl mx-auto pt-20 md:pt-0">
      <div className="bg-dark-300 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-accent-500" />
          <h1 className="text-3xl font-minecraft text-light-100">Privacy Policy</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-accent-500" />
              <h2 className="text-xl font-minecraft text-light-100 m-0">Introduction</h2>
            </div>
            <p className="text-light-300">
              MC Tools is committed to protecting your privacy. This policy explains how we handle information when you use our website and tools.
            </p>
          </div>

          {/* Information Collection */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-accent-500" />
              <h2 className="text-xl font-minecraft text-light-100 m-0">Information We Collect</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-minecraft text-light-100">Automatically Collected Information</h3>
                <p className="text-light-300">We collect basic analytics about how you interact with our tools:</p>
                <ul className="list-disc pl-6 text-light-300">
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                  <li>Features used</li>
                  <li>Device type and browser information</li>
                  <li>Approximate geographic location (country level only)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-minecraft text-light-100">User-Provided Information</h3>
                <p className="text-light-300">When using our tools, you may provide:</p>
                <ul className="list-disc pl-6 text-light-300">
                  <li>Minecraft usernames (for Player Info)</li>
                  <li>Server addresses (for Server Status)</li>
                  <li>Coordinates (for Stronghold Finder and Nether Calculator)</li>
                </ul>
                <p className="text-light-300">This information is:</p>
                <ul className="list-disc pl-6 text-light-300">
                  <li>Only used to provide the requested service</li>
                  <li>Not stored on our servers</li>
                  <li>Not shared with third parties</li>
                  <li>Processed entirely in your browser</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Storage */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-accent-500" />
              <h2 className="text-xl font-minecraft text-light-100 m-0">Data Storage</h2>
            </div>
            <div className="space-y-4 text-light-300">
              <p>We use local storage for:</p>
              <ul className="list-disc pl-6">
                <li>Theme preferences (dark mode)</li>
                <li>Language preferences</li>
                <li>Saved stronghold locations (stored locally on your device only)</li>
              </ul>
              <p>No tracking cookies are used.</p>
            </div>
          </div>

          {/* External Services */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-accent-500" />
              <h2 className="text-xl font-minecraft text-light-100 m-0">External Services</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-minecraft text-light-100">Firebase Analytics</h3>
                <ul className="list-disc pl-6 text-light-300">
                  <li>Used for anonymous usage statistics</li>
                  <li>Collects standard analytics data</li>
                  <li>
                    <a 
                      href="https://firebase.google.com/support/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent-500 hover:text-accent-600 transition-colors"
                    >
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-minecraft text-light-100">External APIs</h3>
                <p className="text-light-300">We use the following APIs to provide our services:</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-minecraft text-light-100">Ashcon API</h4>
                    <ul className="list-disc pl-6 text-light-300">
                      <li>Used for: Player data and UUID lookup</li>
                      <li>Data shared: Minecraft usernames</li>
                      <li>
                        <a 
                          href="https://github.com/Electroid/mojang-api" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent-500 hover:text-accent-600 transition-colors"
                        >
                          Privacy policy
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-minecraft text-light-100">Mineatar API</h4>
                    <ul className="list-disc pl-6 text-light-300">
                      <li>Used for: Skin rendering</li>
                      <li>Data shared: Player UUIDs</li>
                      <li>
                        <a 
                          href="https://github.com/mineatar/api" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent-500 hover:text-accent-600 transition-colors"
                        >
                          Privacy policy
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-minecraft text-light-100">MCStatus API</h4>
                    <ul className="list-disc pl-6 text-light-300">
                      <li>Used for: Server status information</li>
                      <li>Data shared: Server addresses</li>
                      <li>
                        <a 
                          href="https://api.mcstatus.io/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent-500 hover:text-accent-600 transition-colors"
                        >
                          Privacy policy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-minecraft text-light-100 mb-4">Contact Us</h2>
            <p className="text-light-300">
              If you have questions about this privacy policy, please contact us:
            </p>
            <ul className="list-disc pl-6 text-light-300">
              <li>
                <a 
                  href="https://github.com/byteflipper-58/mc-tools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-500 hover:text-accent-600 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;