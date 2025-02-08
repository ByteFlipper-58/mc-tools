import React, { useState } from 'react';
import { Search, User, Hash, RotateCw, Download, Copy, CheckCircle2 } from 'lucide-react';
import { lookupUsername, hyphenateUUID, getPlayerImages } from '../utils/minecraft';

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
        throw new Error('Player not found');
      }

      const playerInfo: PlayerData = {
        username: profile.name,
        uuid: profile.id,
        images: getPlayerImages(profile.id, 16)
      };

      setPlayerData(playerInfo);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch player data');
      setPlayerData(null);
    } finally {
      setLoading(false);
    }
  };

  const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [error, setError] = useState(false);

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
        style={{ display: error ? 'none' : 'block' }}
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto pt-20 md:pt-0">
      <h1 className="text-3xl font-minecraft mb-8 text-center text-dark-200 dark:text-light-100">Player Info</h1>

      <form onSubmit={fetchPlayerData} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter player username"
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
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center text-red-400 mb-8 bg-light-100 dark:bg-dark-200 p-4 rounded-lg">
          {error}
        </div>
      )}

      {playerData && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Full Body Preview */}
            <a
              href={playerData.images.fullBody}
              className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg flex flex-col justify-center items-center min-w-[180px] hover:bg-light-300 dark:hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageWithFallback
                src={playerData.images.fullBody}
                alt={`Full body of ${playerData.username}`}
                className="h-[216px] w-auto"
              />
            </a>

            {/* Player Info Cards */}
            <div className="flex flex-col gap-4 grow">
              {/* Username */}
              <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-100 dark:text-light-300 mb-1">Username</p>
                <p className="font-minecraft text-xl text-dark-200 dark:text-light-100">{playerData.username}</p>
              </div>

              {/* UUID */}
              <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-100 dark:text-light-300 mb-1">UUID</p>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <code className="font-mono text-sm text-dark-200 dark:text-light-100">{hyphenateUUID(playerData.uuid)}</code>
                  <button
                    onClick={() => copyToClipboard(hyphenateUUID(playerData.uuid), 'full')}
                    className="inline-flex items-center gap-2 text-sm text-muted-100 dark:text-light-300 hover:text-accent-500 transition-colors"
                  >
                    {copiedUUID === 'full' ? (
                      <CheckCircle2 className="w-4 h-4 text-accent-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedUUID === 'full' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Trimmed UUID */}
              <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-100 dark:text-light-300 mb-1">Trimmed UUID</p>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <code className="font-mono text-sm text-dark-200 dark:text-light-100">{playerData.uuid}</code>
                  <button
                    onClick={() => copyToClipboard(playerData.uuid, 'trimmed')}
                    className="inline-flex items-center gap-2 text-sm text-muted-100 dark:text-light-300 hover:text-accent-500 transition-colors"
                  >
                    {copiedUUID === 'trimmed' ? (
                      <CheckCircle2 className="w-4 h-4 text-accent-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedUUID === 'trimmed' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Download Raw Skin */}
              <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg shadow-sm">
                <a
                  href={`${playerData.images.rawSkin}?download=true`}
                  className="button-primary inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  Download Raw Skin
                </a>
              </div>
            </div>
          </div>

          {/* Body Views */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { src: playerData.images.frontBody, label: 'Front Side of Body' },
              { src: playerData.images.leftBody, label: 'Left Side of Body' },
              { src: playerData.images.backBody, label: 'Back Side of Body' },
              { src: playerData.images.rightBody, label: 'Right Side of Body' },
            ].map((view, index) => (
              <a
                key={index}
                href={view.src}
                className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg flex flex-col gap-4 items-center hover:bg-light-300 dark:hover:bg-dark-400 transition-colors shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImageWithFallback
                  src={view.src}
                  alt={`${view.label} of ${playerData.username}`}
                  className="h-[216px] w-auto"
                />
                <p className="font-minecraft text-sm text-dark-200 dark:text-light-100">{view.label}</p>
              </a>
            ))}
          </div>

          {/* Face and Head */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={playerData.images.face}
              className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg flex flex-col gap-4 items-center hover:bg-light-300 dark:hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageWithFallback
                src={playerData.images.face}
                alt={`Face of ${playerData.username}`}
                className="h-[216px] w-auto"
              />
              <p className="font-minecraft text-sm text-dark-200 dark:text-light-100">Face</p>
            </a>
            <a
              href={playerData.images.head}
              className="bg-light-200 dark:bg-dark-300 p-6 rounded-lg flex flex-col gap-4 items-center hover:bg-light-300 dark:hover:bg-dark-400 transition-colors shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageWithFallback
                src={playerData.images.head}
                alt={`Head of ${playerData.username}`}
                className="h-[216px] w-auto"
              />
              <p className="font-minecraft text-sm text-dark-200 dark:text-light-100">Head</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerInfo;