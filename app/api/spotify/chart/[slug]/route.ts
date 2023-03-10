import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { headers } from 'next/headers';

export async function GET(request: Request, { params }: Params) {
  const { slug } = params;

  const headersList = headers();
  const accessToken = headersList.get('Authorization');

  if (!accessToken) {
    return new Response('Error');
  }

  const data = await fetch(`https://api.spotify.com/v1/me/top/${slug}`, {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return data.items;
}
