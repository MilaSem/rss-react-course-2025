import { describe, it, expect } from 'vitest';
import { cleanAndTrimText } from './cleanAndTrimText';

describe('cleanAndTrim', () => {
  it('should return an empty string when undefined', () => {
    expect(cleanAndTrimText(10, undefined)).toBe('');
  });

  it('should return the string unchanged if the string is less than maxLengt', () => {
    expect(cleanAndTrimText(10, 'Hello')).toBe('Hello');
  });

  it('should remove HTML tags from the string', () => {
    const html = '<p>Hello <strong>World</strong></p>';
    expect(cleanAndTrimText(20, html)).toBe('Hello World');
  });

  it('should cut off long text and add ellipsis', () => {
    const longText = 'This is a very long text that should be trimmed.';
    expect(cleanAndTrimText(20, longText)).toBe('This is a very long...');
  });

  it('should trim after removing tags and add ellipsis', () => {
    const html = '<div>1234567890abcdef</div>';
    expect(cleanAndTrimText(10, html)).toBe('1234567890...');
  });
});
