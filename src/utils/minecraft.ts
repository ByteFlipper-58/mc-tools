interface MojangProfile {
  id: string;
  name: string;
}

export function hyphenateUUID(uuid: string): string {
  return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20, 32)}`;
}

export async function lookupUsername(username: string): Promise<MojangProfile | null> {
  if (!/^[A-Za-z0-9_]{1,16}$/.test(username)) {
    throw new Error('Invalid username: ' + username);
  }

  try {
    const result = await fetch(
      `https://api.ashcon.app/mojang/v2/user/${encodeURIComponent(username)}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!result.ok) {
      if (result.status === 404) {
        throw new Error('Player not found');
      }
      throw new Error('Failed to fetch player data');
    }

    const data = await result.json();
    return {
      id: data.uuid.replace(/-/g, ''),
      name: data.username
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch player data');
  }
}

export function getPlayerImages(uuid: string, scale: number = 16) {
  return {
    face: `https://api.mineatar.io/face/${uuid}?scale=${scale}&overlay=true`,
    head: `https://api.mineatar.io/head/${uuid}?scale=${scale}&overlay=true`,
    fullBody: `https://api.mineatar.io/body/full/${uuid}?scale=${scale}&overlay=true`,
    frontBody: `https://api.mineatar.io/body/front/${uuid}?scale=${scale}&overlay=true`,
    backBody: `https://api.mineatar.io/body/back/${uuid}?scale=${scale}&overlay=true`,
    leftBody: `https://api.mineatar.io/body/left/${uuid}?scale=${scale}&overlay=true`,
    rightBody: `https://api.mineatar.io/body/right/${uuid}?scale=${scale}&overlay=true`,
    rawSkin: `https://api.mineatar.io/skin/${uuid}`
  };
}