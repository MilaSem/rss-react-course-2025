import type { GlobalCO2Data } from '@/types/CO2Data';

export const filterCountriesByName = (
  data: GlobalCO2Data,
  searchTerm: string,
) => {
  return Object.keys(data).filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
