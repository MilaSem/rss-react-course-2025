import { createResource } from '@/utils/createResource';
import { fetchCO2Data } from '@/api/fetchCO2Data';

export const co2DataResource = createResource(fetchCO2Data());
