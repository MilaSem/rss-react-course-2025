import type { GlobalCO2Data } from '@/types/CO2Data';

const DEV_URL = '/data/owid-co2-data.json';
const PROD_URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export const fetchCO2Data = async (url?: string): Promise<GlobalCO2Data> => {
  const fetchUrl = url || (import.meta.env.DEV ? DEV_URL : PROD_URL);
  const res = await fetch(fetchUrl);
  if (!res.ok) throw new Error('Data download error');
  return await (res.json() as Promise<GlobalCO2Data>);
};
