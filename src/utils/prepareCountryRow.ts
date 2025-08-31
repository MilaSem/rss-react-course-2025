import { getRecordByYear } from './getRecordByYear';
import type { CountryData } from '@/types/CO2Data';

export interface CountryRow {
  country: string;
  iso_code: string;
  year: number | 'N/A';
  population: number | 'N/A';
  co2: number | 'N/A';
  co2_per_capita: number | 'N/A';
  methane: number | 'N/A';
  oil_co2: number | 'N/A';
  temperature_change_from_co2: number | 'N/A';
}

export const prepareCountryRow = (
  countryName: string,
  countryData: CountryData,
  year?: number | null,
): CountryRow => {
  const { iso_code, data } = countryData;
  const record = getRecordByYear(data, year);

  return {
    country: countryName,
    iso_code: iso_code ?? 'N/A',
    year: record?.year ?? 'N/A',
    population: record?.population ?? 'N/A',
    co2: record?.co2 ?? 'N/A',
    co2_per_capita: record?.co2_per_capita ?? 'N/A',
    methane: record?.methane ?? 'N/A',
    oil_co2: record?.oil_co2 ?? 'N/A',
    temperature_change_from_co2: record?.temperature_change_from_co2 ?? 'N/A',
  };
};
