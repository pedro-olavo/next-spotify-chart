export interface Image {
  width: number;
  height: number;
  url: string;
}

export interface Artist {
  name: string;
}

export interface ChartItemProps {
  item: {
    name: string;
    type: 'artist' | 'track';
    artists?: Artist[];
    images: Image[];
    album?: {
      external_urls: {
        spotify: string;
      };
      images: Image[];
      name: string;
      release_date: string;
      type: 'album';
    };

    external_urls: {
      spotify: string;
    };
  };
}
