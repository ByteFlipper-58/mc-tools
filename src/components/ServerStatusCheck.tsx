import React, { useState } from 'react';
import { Server, Users, Globe, Signal, ChevronDown, ChevronUp, Puzzle, Plug as Plugin } from 'lucide-react';

interface ServerStatus {
  online: boolean;
  host: string;
  port: number;
  version: {
    name_raw: string;
    name_clean: string;
    protocol: number;
  };
  players: {
    online: number;
    max: number;
    list: Array<{
      uuid: string;
      name_raw: string;
      name_clean: string;
      name_html: string;
    }>;
  };
  motd: {
    raw: string;
    clean: string;
    html: string;
  };
  icon: string | null;
  mods: Array<{
    name: string;
    version: string;
  }>;
  plugins: Array<{
    name: string;
    version: string | null;
  }>;
}

interface CollapsibleCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function CollapsibleCard({ title, icon, children }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#1A1C1E] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-[#252729] transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-minecraft text-sm">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="p-4 border-t border-gray-700">{children}</div>}
    </div>
  );
}

function ServerStatusCheck() {
  const [serverAddress, setServerAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverInfo, setServerInfo] = useState<ServerStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkServer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch server status');
      }
      const data = await response.json();
      setServerInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check server status');
      setServerInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-minecraft mb-8 text-center">
        Server Status Checker
      </h1>

      <form onSubmit={checkServer} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={serverAddress}
            onChange={(e) => setServerAddress(e.target.value)}
            placeholder="Enter server address (e.g., mc.hypixel.net)"
            className="flex-1 bg-[#2C2F33] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={loading || !serverAddress}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-minecraft disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center text-red-400 mb-8 bg-[#2C2F33] p-4 rounded-lg">
          {error}
        </div>
      )}

      {serverInfo && (
        <div className="bg-[#2C2F33] rounded-lg p-6 space-y-6">
          {/* Server Icon */}
          {serverInfo.icon && (
            <div className="flex justify-center">
              <img
                src={serverInfo.icon}
                alt="Server Icon"
                className="w-16 h-16 rounded"
              />
            </div>
          )}

          {/* MOTD */}
          <div className="bg-[#1A1C1E] p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Message of the Day</h3>
            <div 
              className="font-minecraft minecraft-colors"
              dangerouslySetInnerHTML={{ __html: serverInfo.motd.html.replace(/\n/g, '<br>') }}
            />
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Signal className={`w-5 h-5 ${serverInfo.online ? 'text-emerald-400' : 'text-red-400'}`} />
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <div className="font-minecraft">
                  {serverInfo.online ? (
                    <span className="text-emerald-400">Online</span>
                  ) : (
                    <span className="text-red-400">Offline</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-sm text-gray-400">Players</div>
                <div className="font-minecraft">
                  {serverInfo.players.online}/{serverInfo.players.max}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-sm text-gray-400">Version</div>
                <div className="font-minecraft">{serverInfo.version.name_clean}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-sm text-gray-400">Address</div>
                <div className="font-minecraft text-sm">
                  {serverInfo.host}:{serverInfo.port}
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Cards */}
          <div className="space-y-4">
            {/* Players List */}
            {serverInfo.players.list && serverInfo.players.list.length > 0 && (
              <CollapsibleCard
                title={`Online Players (${serverInfo.players.list.length})`}
                icon={<Users className="w-5 h-5 text-emerald-400" />}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serverInfo.players.list.map((player, index) => (
                    <div 
                      key={player.uuid} 
                      className="font-minecraft text-sm minecraft-colors"
                      dangerouslySetInnerHTML={{ __html: player.name_html }}
                    />
                  ))}
                </div>
              </CollapsibleCard>
            )}

            {/* Mods List */}
            {serverInfo.mods && serverInfo.mods.length > 0 && (
              <CollapsibleCard
                title={`Mods (${serverInfo.mods.length})`}
                icon={<Puzzle className="w-5 h-5 text-emerald-400" />}
              >
                <div className="grid grid-cols-1 gap-2">
                  {serverInfo.mods.map((mod, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-minecraft text-sm">{mod.name}</span>
                      <span className="text-sm text-gray-400">{mod.version}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleCard>
            )}

            {/* Plugins List */}
            {serverInfo.plugins && serverInfo.plugins.length > 0 && (
              <CollapsibleCard
                title={`Plugins (${serverInfo.plugins.length})`}
                icon={<Plugin className="w-5 h-5 text-emerald-400" />}
              >
                <div className="grid grid-cols-1 gap-2">
                  {serverInfo.plugins.map((plugin, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-minecraft text-sm">{plugin.name}</span>
                      <span className="text-sm text-gray-400">{plugin.version || 'Unknown'}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServerStatusCheck;