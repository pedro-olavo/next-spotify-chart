import { Image } from '../app/components/ChartItem/types';

export interface Track {
  type: 'track';
  external_urls: {
    spotify: string;
  };
  name: string;
  uri: string;
  artists: Artist[];
  album: Album;
}

export interface Artist {
  type: 'artist';
  external_urls: {
    spotify: string;
  };
  images: Image[];
  name: string;
  uri: string;
}

export interface Album {
  name: string;
  images: Images[];
}

export interface LastPlayedTracks {
  track: Track;
}

export interface UserResponse {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: 0;
  };
}

export interface Images {
  url: string;
  height: number;
  width: number;
}
