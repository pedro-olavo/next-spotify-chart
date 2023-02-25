import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface CardProps {
  title: string;
  image: StaticImageData;
}

const Card = ({ title, image }: CardProps) => {
  return (
    <div className="group relative flex aspect-video h-[33vh] w-full overflow-hidden rounded-xl 2xl:aspect-auto">
      <div className="z-30 flex flex-1 items-center justify-center">
        <h2 className="text-5xl font-bold tracking-wider lg:text-6xl xl:text-7xl">
          {title}
        </h2>
      </div>

      <div className="absolute z-20 h-full w-full bg-[#221C1C] opacity-[0.66]"></div>

      <Image
        src={image}
        alt="An artist singing to a crowd"
        fill
        className="z-10 transition-transform duration-[2000ms] ease-linear group-hover:scale-125 group-hover:duration-[5000ms]"
      />
    </div>
  );
};

export default Card;
