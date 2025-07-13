export const cleanAndTrimText = (maxLength: number, html = ''): string => {
  const text = (html ?? '').replace(/<[^>]+>/g, '').trim();

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trimEnd() + '...';
};
