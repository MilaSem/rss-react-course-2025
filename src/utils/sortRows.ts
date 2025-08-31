import type { CountryRow } from './prepareCountryRow';

type SortField = 'name' | 'population';

const sortByName = (
  a: CountryRow,
  b: CountryRow,
  direction: 'asc' | 'desc',
): number => {
  const countryNameA = a.country.toLowerCase();
  const countryNameB = b.country.toLowerCase();
  return direction === 'asc'
    ? countryNameA.localeCompare(countryNameB)
    : countryNameB.localeCompare(countryNameA);
};

const sortByPopulation = (
  a: CountryRow,
  b: CountryRow,
  direction: 'asc' | 'desc',
): number => {
  const populationA =
    a.population === 'N/A'
      ? direction === 'asc'
        ? Infinity
        : -Infinity
      : a.population;
  const populationB =
    b.population === 'N/A'
      ? direction === 'asc'
        ? Infinity
        : -Infinity
      : b.population;
  return direction === 'asc'
    ? populationA - populationB
    : populationB - populationA;
};

export const sortRows = (
  rows: CountryRow[],
  sortField: SortField,
  sortDirection: 'asc' | 'desc',
) => {
  return [...rows].sort((a, b) => {
    switch (sortField) {
      case 'name':
        return sortByName(a, b, sortDirection);
      case 'population':
        return sortByPopulation(a, b, sortDirection);
      default:
        return 0;
    }
  });
};
