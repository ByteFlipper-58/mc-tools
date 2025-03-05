import React, { useState } from 'react';
import { Search, RotateCw, Download, Copy, CheckCircle2 } from 'lucide-react';
import { lookupUsername, hyphenateUUID, getPlayerImages } from '../utils/minecraft';
import { useTranslation } from '../lib/i18n';
import { useTelegramBackButton } from '../lib/telegram';
import { logAnalyticsEvent } from '../lib/firebase';

interface PlayerData {
  username: string;
  uuid: string;
  images: {
    face: string;
    head: string;
    fullBody: string;
    frontBody: string;
    backBody: string;
    leftBody: string;
    rightBody: string;
    rawSkin: string;
  };
}

function PlayerInfo() {
  const [username, setUsername] = useState('');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedUUID, setCopiedUUID] = useState<'full' | 'trimmed' | null>(null);
  const t = useTranslation();
  
  useTelegramBackButton(true);

  const copyToClipboard = async (text: string, type: 'full' | 'trimmed') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUUID(type);
      setTimeout(() => setCopiedUUID(null), 2000);

      // Log copy event
      logAnalyticsEvent('copy_uuid', {
        type,
        username: playerData?.username
      });
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const fetchPlayerData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      // Log player lookup attempt
      logAnalyticsEvent('player_lookup', {
        username: username.trim()
      });

      const profile = await lookupUsername(username.trim());
      
      if (!profile) {
        throw new Error(t.player.notFound);
      }

      const playerInfo: PlayerData = {
        username: profile.name,
        uuid: profile.id,
        images: getPlayerImages(profile.id, 16)
      };

      setPlayerData(playerInfo);
      setError(null);

      // Log successful lookup
      logAnalyticsEvent('player_lookup_success', {
        username: profile.name,
        uuid: profile.id
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t.player.fetchError;
      setError(errorMessage);
      setPlayerData(null);

      // Log failed lookup
      logAnalyticsEvent('player_lookup_error', {
        username: username.trim(),
        error_message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-minecraft mb-6 text-light-100">
        {t.player.title}
      </h1>

      <form onSubmit={fetchPlayerData} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.common.enterUsername}
            className="input-base w-full md:w-[70%]"
          />
          <button
            type="submit"
            disabled={loading || !username}
            className="button-primary w-full md:w-[30%] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RotateCw className="w-5 h-5 animate-spin" />
                <span>{t.common.searching}</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>{t.player.searchPlayer}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center text-red-400 mb-6 bg-dark-200 p-4 rounded-lg">
          {error}
        </div>
      )}

      {playerData && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-5">
            <a
              href={playerData.images.fullBody}
              className="bg-dark-300 p-6 rounded-lg flex flex-col justify-center items-center min-w-[180px] hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logAnalyticsEvent('view_full_body', { username: playerData.username })}
            >
              <img
                src={playerData.images.fullBody}
                alt={`${t.player.body.full} ${playerData.username}`}
                className="h-[216px] w-auto"
              />
            </a>

            <div className="flex flex-col gap-4 grow">
              <div className="bg-dark-300 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-light-300 mb-1">{t.common.username}</p>
                <p className="font-minecraft text-xl text-light-100">{playerData.username}</p>
              </div>

              <div className="bg-dark-300 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-light-300 mb-1">{t.common.uuid}</p>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <code className="font-mono text-sm text-light-100">{hyphenateUUID(playerData.uuid)}</code>
                  <button
                    onClick={() => copyToClipboard(hyphenateUUID(playerData.uuid), 'full')}
                    className="inline-flex items-center gap-2 text-sm text-light-300 hover:text-accent-500 transition-colors"
                  >
                    {copiedUUID === 'full' ? (
                      <CheckCircle2 className="w-4 h-4 text-accent-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedUUID === 'full' ? t.common.copied : t.common.copyToClipboard}
                  </button>
                </div>
              </div>

              <div className="bg-dark-300 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-light-300 mb-1">{t.player.trimmedUUID}</p>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <code className="font-mono text-sm text-light-100">{playerData.uuid}</code>
                  <button
                    onClick={() => copyToClipboard(playerData.uuid, 'trimmed')}
                    className="inline-flex items-center gap-2 text-sm text-light-300 hover:text-accent-500 transition-colors"
                  >
                    {copiedUUID === 'trimmed' ? (
                      <CheckCircle2 className="w-4 h-4 text-accent-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedUUID === 'trimmed' ? t.common.copied : t.common.copyToClipboard}
                  </button>
                </div>
              </div>

              <div className="bg-dark-300 p-4 rounded-lg shadow-sm">
                <a
                  href={`${playerData.images.rawSkin}?download=true`}
                  className="button-primary inline-flex items-center justify-center gap-2 w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logAnalyticsEvent('download_skin', { username: playerData.username })}
                >
                  <Download className="w-4 h-4" />
                  <span>{t.player.downloadSkin}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { src: playerData.images.frontBody, label: t.player.body.front },
              { src: playerData.images.leftBody, label: t.player.body.left },
              { src: playerData.images.backBody, label: t.player.body.back },
              { src: playerData.images.rightBody, label: t.player.body.right },
            ].map((view, index) => (
              <a
                key={index}
                href={view.src}
                className="bg-dark-300 p-4 rounded-lg flex flex-col gap-4 items-center hover:bg-dark-400 transition-colors shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logAnalyticsEvent('view_body_side', { 
                  username: playerData.username,
                  side: view.label
                })}
              >
                <img
                  src={view.src}
                  alt={`${view.label} ${playerData.username}`}
                  className="h-[180px] w-auto"
                />
                <p className="font-minecraft text-sm text-light-100">{view.label}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={playerData.images.face}
              className="bg-dark-300 p-4 rounded-lg flex flex-col gap-4 items-center hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logAnalyticsEvent('view_face', { username: playerData.username })}
            >
              <img
                src={playerData.images.face}
                alt={`${t.player.face} ${playerData.username}`}
                className="h-[180px] w-auto"
              />
              <p className="font-minecraft text-sm text-light-100">{t.player.face}</p>
            </a>
            <a
              href={playerData.images.head}
              className="bg-dark-300 p-4 rounded-lg flex flex-col gap-4 items-center hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logAnalyticsEvent('view_head', { username: playerData.username })}
            >
              <img
                src={playerData.images.head}
                alt={`${t.player.head} ${playerData.username}`}
                className="h-[180px] w-auto"
              />
              <p className="font-minecraft text-sm text-light-100">{t.player.head}</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerInfo;