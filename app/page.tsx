import React from 'react';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';
import { ArtistDisplay, Card, Button } from './components';
import useAuth from './hooks/useAuth';

import artistSinging from '../public/artist-singing.jpg';
import vinylRecord from '../public/vinyl-record.jpg';
import { Artist, UserInfo } from '../types/userChartTypes';

const getRecentlyPlayed = async (token: string) => {
  const res = await fetch('http://localhost:3000/api/spotify/recently-played', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data as Artist[];
};

const getCurrentUser = async (token: string) => {
  const res = await fetch('http://localhost:3000/api/spotify/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data as UserInfo;
};

export default async function Home() {
  const user = await useAuth();

  const recentlyPlayedArtists = await getRecentlyPlayed(user.access_token);
  const userInfo = await getCurrentUser(user.access_token);

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center space-y-5 bg-spotify-black py-5 text-white 2xl:space-y-8 ">
      <div className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 ">
        <div className="flex items-center space-x-3">
          <a
            className="relative flex aspect-square w-20 items-center justify-center overflow-hidden rounded-full bg-stone-800 xl:w-28"
            target="_blank"
            href={userInfo.external_urls.spotify}
            rel="noopener noreferrer"
          >
            {!user.image ? (
              <div className="text-4xl">
                <FiUser />
              </div>
            ) : (
              <Image src={user.image} alt="Profile Picture" fill />
            )}
          </a>
          <span className="text-2xl font-bold xl:text-4xl">
            {user.name?.split(' ')[0]}
          </span>
        </div>

        <Button.SignOut />
      </div>

      <div className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <span className="text-lg font-semibold md:text-xl">
          Ouvidos Recentemente
        </span>
        <span className="font-bold text-spotify-green md:text-lg">
          Ver Mais
        </span>
      </div>

      <div className="w-full pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-12 2xl:pl-14">
        <div className="flex snap-x space-x-3 overflow-x-auto pr-3 pb-4 scrollbar-hide lg:snap-none lg:scrollbar-default">
          {recentlyPlayedArtists?.map((artist, idx) => (
            <ArtistDisplay key={idx} {...artist} />
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <span className="text-lg font-semibold md:text-xl">
          Confira suas charts!
        </span>
      </div>

      <div className="flex w-full flex-col space-y-5 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:flex-row 2xl:space-x-5 2xl:space-y-0 2xl:px-14">
        <Card title="ARTISTAS" image={artistSinging} />
        <Card title="MÚSICAS" image={vinylRecord} />
      </div>
    </div>
  );
}
