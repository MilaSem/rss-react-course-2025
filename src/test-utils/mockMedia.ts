import type { Media } from '@/types/anilistTypes';

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
