import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { unstable_getServerSession } from 'next-auth';
import { FiUser } from 'react-icons/fi';

import { options } from '../pages/api/auth/[...nextauth]';
import SignOutButton from './SignOutButton.component';
import ArtistDisplay from './components/ArtistDisplay';

import { Artist, LastPlayedTracks } from '../types/userChartTypes';

async function getSession() {
  const session = await unstable_getServerSession(options);

  if (!session) {
    redirect('auth/signin');
  }

  return session;
}

async function getRecentlyPlayedArtists(token: string) {
  const response = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  const lastPlayedArtists: Artist[] = data.items.reduce(
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

  return lastPlayedArtists;
}

export default async function Home() {
  const { user } = await getSession();

  const recentlyPlayedArtists = await getRecentlyPlayedArtists(
    user.access_token,
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-lg flex-col items-center space-y-5 bg-spotify-black py-4 text-white">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <button
            className="relative flex aspect-square w-20 items-center justify-center overflow-hidden rounded-full bg-stone-800"
            type="button"
          >
            {!user.image ? (
              <div className="text-4xl">
                <FiUser />
              </div>
            ) : (
              <Image src={user.image} alt="Profile Picture" fill />
            )}
          </button>
          <span className="text-2xl font-bold">Pedro</span>
        </div>

        <SignOutButton />
      </div>

      <div className="flex w-full items-center justify-between px-4">
        <span className="font-medium">Ouvidos Recentemente</span>
        <span className=" font-bold text-spotify-green">Ver Mais</span>
      </div>

      <div className="w-full">
        <div className="flex snap-x overflow-x-auto pb-3 scrollbar-hide lg:snap-none lg:scrollbar-default">
          {recentlyPlayedArtists?.map((artist, idx) => (
            <ArtistDisplay {...artist} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
