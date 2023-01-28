export interface Track {
  type: 'track';
  external_urls: {
    spotify: string;
  };
  name: string;
  uri: string;
}

export interface Artist {
  type: 'artist';
  external_urls: {
    spotify: string;
  };
  name: string;
  uri: string;
}
