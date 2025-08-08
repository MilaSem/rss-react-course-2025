import type { Media } from '@/types/anilistTypes';
import type { ApiResponse } from '@/api/fetchAnimeData';

export const mockMediaItemWithEnglish: Media = {
  id: 1,
  title: { english: 'English Title', romaji: 'Romaji Title' },
  description: 'Some description here',
  coverImage: { extraLarge: 'https://example.com/image1.jpg' },
  status: 'RELEASING',
};

export const mockMediaItemWithRomajiOnly: Media = {
  id: 2,
  title: { english: undefined, romaji: 'Romaji Title' },
  description: 'Description for romaji only',
  coverImage: { extraLarge: 'https://example.com/image2.jpg' },
  status: 'FINISHED',
};

export const mockMediaItemNoTitle: Media = {
  id: 3,
  title: { english: undefined, romaji: undefined },
  description: 'Description without title',
  coverImage: { extraLarge: 'https://example.com/image3.jpg' },
  status: 'CANCELLED',
};

export const mockMediaItemNoDescription: Media = {
  id: 4,
  title: { english: 'English Title', romaji: 'Romaji Title' },
  description: undefined,
  coverImage: { extraLarge: 'https://example.com/image4.jpg' },
  status: 'RELEASING',
};

export const mockMediaItems: Media[] = [
  mockMediaItemWithEnglish,
  mockMediaItemWithRomajiOnly,
  mockMediaItemNoDescription,
];

export const mockMediaItemsBySearchTerm: Media[] = [
  mockMediaItemWithEnglish,
  mockMediaItemNoDescription,
];

export const mockApiResponse: ApiResponse = {
  data: {
    Page: {
      pageInfo: { hasNextPage: true, currentPage: 1 },
      media: mockMediaItems,
    },
  },
};

export const mockApiResponseWithoutPageInfo: ApiResponse = {
  data: {
    Page: {
      pageInfo: { currentPage: 1 },
      media: mockMediaItems,
    },
  },
};

export const mockAnimeFullData: Media = {
  id: 123,
  title: {
    romaji: 'Sample Romaji',
    english: 'Sample English',
    native: 'サンプル',
  },
  description: 'Sample description',
  genres: ['Action', 'Adventure'],
  episodes: 24,
  seasonYear: 2023,
  status: 'RELEASING',
  averageScore: 85,
  coverImage: {
    extraLarge: 'https://example.com/extraLarge.jpg',
    large: 'https://example.com/large.jpg',
    medium: 'https://example.com/medium.jpg',
    color: '#FFFFFF',
  },
  siteUrl: 'https://example.com/anime/123',
};
