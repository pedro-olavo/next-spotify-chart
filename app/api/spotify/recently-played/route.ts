import { Artist, LastPlayedTracks } from '../../../../types/userChartTypes';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = headers();
  const accessToken = headersList.get('Authorization');

  if (!accessToken) {
    return new Response('Error');
  }

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=30`,
    {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  const uniqueArtists = getUniqueArtists(data.items);

  return new Response(JSON.stringify(uniqueArtists));
}

const getUniqueArtists = (lastPlayedTracks: LastPlayedTracks[]) => {
  const uniqueArtists = lastPlayedTracks.reduce(
    (unique: Artist[], item: LastPlayedTracks) => {
      if (
        !unique.some((artist) => artist.name === item.track.artists[0].name)
      ) {
        unique.push({
          ...item.track.artists[0],
          images: item.track.album.images,
        });
      }

      return unique;
    },
    [],
  );

  return uniqueArtists;
};
