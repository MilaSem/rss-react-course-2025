import type { CO2Data } from '@/types/CO2Data';

export const getRecordByYear = (
  records: CO2Data[],
  year?: number | null,
): CO2Data | null => {
  if (!year || year === null) {
    return records.length > 0 ? records[records.length - 1] : null;
  }
  return records.find((record) => record.year === year) || null;
};
