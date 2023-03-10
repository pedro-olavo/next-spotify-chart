import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = headers();
  const accessToken = headersList.get('Authorization');

  if (!accessToken) {
    return new Response('Error');
  }

  const res = await fetch(`https://api.spotify.com/v1/me/`, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  const total = await getFollowingArtists(accessToken);

  return new Response(JSON.stringify({ ...data, following: { total } }));
}

async function getFollowingArtists(token: string) {
  const res = await fetch(
    'https://api.spotify.com/v1/me/following?type=artist',

    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await res.json();

  return data.artists.total;
}
