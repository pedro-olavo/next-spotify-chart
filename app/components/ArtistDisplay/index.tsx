'use client';

import React from 'react';
import Image from 'next/image';
import { Artist } from '../../../types/userChartTypes';

export const ArtistDisplay = ({ external_urls, images, name }: Artist) => {
  return (
    <a
      className="flex w-[25vw] shrink-0 snap-start flex-col sm:w-[20vw] md:w-[15vw] lg:w-[20vw] xl:w-[10vw]"
      href={external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-md">
        <Image src={images[0].url} alt="Album Cover" fill />
      </div>
      <span className="pt-2 text-center text-base line-clamp-1 lg:text-lg lg:font-medium">
        {name}
      </span>
    </a>
  );
};
