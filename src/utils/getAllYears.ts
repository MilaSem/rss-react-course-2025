import type { GlobalCO2Data } from '@/types/CO2Data';

export const getAllYears = (data: GlobalCO2Data): number[] => {
  const yearsSet = new Set<number>();

  Object.values(data).forEach((country) => {
    country.data.forEach((record) => {
      yearsSet.add(record.year);
    });
  });

  return Array.from(yearsSet).sort((a, b) => b - a);
};
