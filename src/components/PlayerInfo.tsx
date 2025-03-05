import React, { useState } from 'react';
import { Search, RotateCw, Download, Copy, CheckCircle2 } from 'lucide-react';
import { lookupUsername, hyphenateUUID, getPlayerImages } from '../utils/minecraft';
import { useTranslation } from '../lib/i18n';
import PageTitle from './PageTitle';

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

  const copyToClipboard = async (text: string, type: 'full' | 'trimmed') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUUID(type);
      setTimeout(() => setCopiedUUID(null), 2000);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : t.player.fetchError);
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageTitle>{t.player.title}</PageTitle>

      <form onSubmit={fetchPlayerData} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.common.enterUsername}
            className="input-base flex-1"
          />
          <button
            type="submit"
            disabled={loading || !username}
            className="button-primary flex items-center gap-2"
          >
            {loading ? (
              <>
                <RotateCw className="w-5 h-5 animate-spin" />
                {t.common.searching}
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                {t.player.searchPlayer}
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
            {/* Full Body Preview */}
            <a
              href={playerData.images.fullBody}
              className="bg-dark-300 p-6 rounded-lg flex flex-col justify-center items-center min-w-[180px] hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={playerData.images.fullBody}
                alt={`${t.player.body.full} ${playerData.username}`}
                className="h-[216px] w-auto"
              />
            </a>

            {/* Player Info Cards */}
            <div className="flex flex-col gap-4 grow">
              {/* Username */}
              <div className="bg-dark-300 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-light-300 mb-1">{t.common.username}</p>
                <p className="font-minecraft text-xl text-light-100">{playerData.username}</p>
              </div>

              {/* UUID */}
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

              {/* Trimmed UUID */}
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

              {/* Download Raw Skin */}
              <div className="bg-dark-300 p-4 rounded-lg shadow-sm">
                <a
                  href={`${playerData.images.rawSkin}?download=true`}
                  className="button-primary inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  {t.player.downloadSkin}
                </a>
              </div>
            </div>
          </div>

          {/* Body Views */}
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

          {/* Face and Head */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={playerData.images.face}
              className="bg-dark-300 p-4 rounded-lg flex flex-col gap-4 items-center hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
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