export const cleanAndTrimText = (
  html: string | undefined,
  maxLength: number,
): string => {
  const text = (html ?? '').replace(/<[^>]+>/g, '');

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trimEnd() + '...';
};
