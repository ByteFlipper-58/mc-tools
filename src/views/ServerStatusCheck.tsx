import React, { useState } from 'react';
import { Server, Users, Globe, Signal, Puzzle, Plug as Plugin } from 'lucide-react';
import { useTranslation } from '../lib/i18n';
import CollapsibleCard from '../components/server/CollapsibleCard';
import { useTelegramBackButton } from '../lib/telegram';
import { logAnalyticsEvent } from '../lib/firebase';

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

function ServerStatusCheck() {
  const [serverAddress, setServerAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverInfo, setServerInfo] = useState<ServerStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslation();
  
  useTelegramBackButton(true);

  const checkServer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Log server check attempt
      logAnalyticsEvent('server_check', {
        server_address: serverAddress
      });

      const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch server status');
      }
      const data = await response.json();
      setServerInfo(data);

      // Log successful server check
      logAnalyticsEvent('server_check_success', {
        server_address: serverAddress,
        server_version: data.version.name_clean,
        players_online: data.players.online
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check server status';
      setError(errorMessage);
      setServerInfo(null);

      // Log failed server check
      logAnalyticsEvent('server_check_error', {
        server_address: serverAddress,
        error_message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-minecraft mb-6 text-light-100">
        {t.server.title}
      </h1>

      <form onSubmit={checkServer} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={serverAddress}
            onChange={(e) => setServerAddress(e.target.value)}
            placeholder={t.common.enterServerAddress}
            className="input-base w-full md:w-[70%]"
          />
          <button
            type="submit"
            disabled={loading || !serverAddress}
            className="button-primary w-full md:w-[30%] flex items-center justify-center gap-2"
          >
            {loading ? t.common.checking : t.server.checkServer}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center text-red-400 mb-6 bg-dark-200 p-4 rounded-lg">
          {error}
        </div>
      )}

      {serverInfo && (
        <div className="bg-dark-300 rounded-lg p-6 space-y-6 shadow-sm">
          {serverInfo.icon && (
            <div className="flex justify-center">
              <img
                src={serverInfo.icon}
                alt="Server Icon"
                className="w-16 h-16 rounded"
              />
            </div>
          )}

          <div className="bg-dark-200 p-4 rounded-lg">
            <h3 className="text-sm text-light-300 mb-2">{t.server.motd}</h3>
            <div 
              className="font-minecraft minecraft-colors"
              dangerouslySetInnerHTML={{ __html: serverInfo.motd.html.replace(/\n/g, '<br>') }}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Signal className={`w-5 h-5 ${serverInfo.online ? 'text-accent-500' : 'text-red-400'}`} />
              <div>
                <div className="text-sm text-light-300">{t.common.status}</div>
                <div className="font-minecraft">
                  {serverInfo.online ? (
                    <span className="text-accent-500">{t.common.online}</span>
                  ) : (
                    <span className="text-red-400">{t.common.offline}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-accent-500" />
              <div>
                <div className="text-sm text-light-300">{t.common.players}</div>
                <div className="font-minecraft text-light-100">
                  {t.server.playerCount.replace('{online}', serverInfo.players.online.toString()).replace('{max}', serverInfo.players.max.toString())}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-accent-500" />
              <div>
                <div className="text-sm text-light-300">{t.common.version}</div>
                <div className="font-minecraft text-light-100">{serverInfo.version.name_clean}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-accent-500" />
              <div>
                <div className="text-sm text-light-300">{t.common.address}</div>
                <div className="font-minecraft text-sm text-light-100">
                  {serverInfo.host}:{serverInfo.port}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {serverInfo.players.list && serverInfo.players.list.length > 0 && (
              <CollapsibleCard
                title={t.server.onlinePlayers}
                icon={<Users className="w-5 h-5 text-accent-500" />}
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

            {serverInfo.mods && serverInfo.mods.length > 0 ? (
              <CollapsibleCard
                title={t.server.modCount.replace('{count}', serverInfo.mods.length.toString())}
                icon={<Puzzle className="w-5 h-5 text-accent-500" />}
              >
                <div className="grid grid-cols-1 gap-2">
                  {serverInfo.mods.map((mod, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-minecraft text-sm text-light-100">{mod.name}</span>
                      <span className="text-sm text-light-300">{mod.version}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleCard>
            ) : (
              <div className="text-sm text-light-300 text-center">
                {t.server.noMods}
              </div>
            )}

            {serverInfo.plugins && serverInfo.plugins.length > 0 ? (
              <CollapsibleCard
                title={t.server.pluginCount.replace('{count}', serverInfo.plugins.length.toString())}
                icon={<Plugin className="w-5 h-5 text-accent-500" />}
              >
                <div className="grid grid-cols-1 gap-2">
                  {serverInfo.plugins.map((plugin, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-minecraft text-sm text-light-100">{plugin.name}</span>
                      <span className="text-sm text-light-300">{plugin.version || t.server.unknown}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleCard>
            ) : (
              <div className="text-sm text-light-300 text-center">
                {t.server.noPlugins}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServerStatusCheck;