import type { Media } from '@/types/anilistTypes';

export const mockMediaItem1: Media = {
  id: 1,
  title: { english: 'English Title 1', romaji: 'Romaji Title 1' },
  description: 'Description 1',
  coverImage: { extraLarge: 'https://example.com/image1.jpg' },
  status: 'RELEASING',
};

export const mockMediaItem2: Media = {
  id: 2,
  title: { english: 'English Title 2', romaji: 'Romaji Title 2' },
  description: '',
  coverImage: { extraLarge: 'https://example.com/image2.jpg' },
  status: 'FINISHED',
};

export const mockMediaItem3: Media = {
  id: 3,
  title: { english: '', romaji: 'Romaji Title 3' },
  description: 'Description 3',
  coverImage: { extraLarge: 'https://example.com/image3.jpg' },
  status: 'CANCELLED',
};

export const mockMediaItems: Media[] = [
  mockMediaItem1,
  mockMediaItem2,
  mockMediaItem3,
];

export const mockMediaItemsBySearchTerm: Media[] = [
  mockMediaItem1,
  mockMediaItem2,
];
