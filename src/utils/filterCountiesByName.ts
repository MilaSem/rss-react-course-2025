import type { GlobalCO2Data } from '@/types/CO2Data';

export const filterCountriesByName = (
  data: GlobalCO2Data,
  searchTerm: string,
) => {
  const lowerSearchTerm = searchTerm.toLowerCase();

  return Object.keys(data).filter((country) =>
    country.toLowerCase().includes(lowerSearchTerm),
  );
};
