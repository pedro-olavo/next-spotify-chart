import React from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { SlInfo } from 'react-icons/sl';
import { ChartItemProps } from './types';

const ChartItem = ({
  item: { name, type, artists, images, external_urls, album },
}: ChartItemProps) => {
  return (
    <a
      className="group flex w-full items-center"
      href={external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={cx(
          'relative mr-4 aspect-square h-16 shrink-0 overflow-hidden',
          {
            'rounded-full': type === 'artist',
          },
        )}
      >
        <Image
          src={
            type === 'artist' ? images[0].url : (album?.images[0].url as string)
          }
          fill
          alt={`${type} image`}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <SlInfo />
            </div>
            <div className="h-full w-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60"></div>
          </div>
        </div>
      </div>

      <div className="max-w-full truncate text-left text-neutral-400">
        <h1 className="truncate font-medium text-white">{name}</h1>

        {type === 'track' && (
          <>
            {artists?.map((artist, index) => {
              return (
                <p key={index} className="inline">
                  {artist.name}
                  {artists.length > 0 && index === artists.length - 1
                    ? ''
                    : ','}
                  &nbsp;
                </p>
              );
            })}
          </>
        )}
      </div>
    </a>
  );
};

export default ChartItem;
