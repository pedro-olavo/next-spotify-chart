'use client';

import React from 'react';
import Image from 'next/image';
import spotifyAppImage from '../../../public/spotify-app-image.jpg';
import spotifyWhiteIcon from '../../../public/spotify-icon-rgb-white.png';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex h-screen w-screen bg-spotify-black landscape:flex">
      <div className="relative h-4/5 flex-1 blur-sm 2xl:max-w-[40vw] landscape:h-full landscape:blur-0">
        <Image src={spotifyAppImage} alt="Image of the Spotify app" fill />
      </div>

      <div className="absolute bottom-0 right-0 left-0 flex h-1/3 flex-1 flex-col items-center justify-center rounded-t-3xl bg-spotify-black px-6 shadow-top landscape:static landscape:h-full landscape:rounded-none">
        <h1 className="max-w-3/4 mb-2 text-center font-title text-3xl text-spotify-green portrait:md:text-4xl xl:text-4xl 2xl:mb-4 2xl:text-5xl">
          Next Spotify Chart
        </h1>
        <p className="mb-6 text-gray-200 portrait:md:text-lg xl:text-xl 2xl:mb-8 2xl:text-2xl">
          Confira sua lista dos artistas e músicas mais ouvidos do mês!
        </p>

        <button
          type="button"
          className="flex w-full max-w-screen-sm cursor-pointer items-center justify-center rounded-full bg-spotify-green py-3 ring-green-400 transition-all duration-200 focus:ring-2 xl:focus:ring-4"
          onClick={() =>
            signIn('spotify', {
              callbackUrl: '/',
            })
          }
        >
          <div className="relative mr-3 h-7 w-7 flex-shrink-0 xl:h-10 xl:w-10">
            <Image src={spotifyWhiteIcon} alt="Logo" fill />
          </div>
          <p className="font-semibold text-gray-100 xl:text-lg">
            Entre com Spotify
          </p>
        </button>
      </div>
    </div>
  );
}
