'use client';

import React from 'react';
import Image from 'next/image';
import { Artist } from '../../../types/userChartTypes';

const ArtistDisplay = ({ external_urls, images, name }: Artist) => {
  return (
    <a
      className="ml-3 flex w-[25vw] shrink-0 snap-center flex-col sm:w-[20vw] md:w-[15vw] lg:w-[10vw] xl:w-[8vw]"
      href={external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-md">
        <Image src={images[0].url} alt="Album Cover" fill />
      </div>
      <span className="pt-2 text-center font-semibold line-clamp-2">
        {name}
      </span>
    </a>
  );
};

export default ArtistDisplay;
