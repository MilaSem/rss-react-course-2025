export const prepareCsv = (
  data: { name: string; description: string }[],
): string => {
  const header = ['Name', 'Description'];
  const rows = data.map((d) =>
    [d.name, d.description.replace(/\n/g, ' ')]
      .map((field) => `"${field.replace(/"/g, '""')}"`)
      .join(','),
  );
  return [header.join(','), ...rows].join('\n');
};
