import type { CO2Data } from '@/types/CO2Data';

export const getLatestRecords = (records: CO2Data[]): CO2Data | null => {
  return records.length > 0 ? records[records.length - 1] : null;
};
