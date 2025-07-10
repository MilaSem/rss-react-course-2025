export type MediaTitle = {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred?: string;
};

export type MediaCoverImage = {
  extraLarge?: string;
  large?: string;
  medium?: string;
  color?: string;
};

export type MediaStatus =
  | 'FINISHED'
  | 'RELEASING'
  | 'NOT_YET_RELEASED'
  | 'CANCELLED'
  | 'HIATUS';

export type Media = {
  id: number;
  title: MediaTitle;
  description?: string;
  genres?: string[];

  episodes?: number;
  seasonYear?: number;
  status?: MediaStatus;

  averageScore?: number;
  coverImage?: MediaCoverImage;
  siteUrl?: string;
};

export type PageInfo = {
  total?: number;
  perPage?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
};
