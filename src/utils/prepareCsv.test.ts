import { describe, it, expect } from 'vitest';
import { prepareCsv } from './prepareCsv';
import {
  mockMediaItemWithEnglish,
  mockMediaItemWithRomajiOnly,
} from '@/test-utils/mockMedia';

describe('prepareCsv with anime media items', () => {
  it('should generate CSV with titles and descriptions', () => {
    const data = [
      {
        name: mockMediaItemWithEnglish.title.english ?? '',
        description: mockMediaItemWithEnglish.description ?? '',
      },
      {
        name: mockMediaItemWithRomajiOnly.title.english ?? '',
        description: mockMediaItemWithRomajiOnly.description ?? '',
      },
    ];

    const expectedCsv = `Name,Description
"English Title","Some description here"
"","Description for romaji only"`;

    const result = prepareCsv(data);
    expect(result).toBe(expectedCsv);
  });

  it('should handle descriptions with newlines and quotes', () => {
    const data = [
      {
        name: 'Anime "Special"',
        description: 'Line1\nLine2 with "quotes"',
      },
    ];

    const expectedCsv = `Name,Description
"Anime ""Special""","Line1 Line2 with ""quotes"""`;

    const result = prepareCsv(data);
    expect(result).toBe(expectedCsv);
  });
});
