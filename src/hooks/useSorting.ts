import { useState } from 'react';

type SortField = 'name' | 'population';
type SortDirection = 'asc' | 'desc';

export const useSorting = () => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const changeSortField = (field: SortField) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortButtonLabel = () => {
    if (sortField === 'name') {
      return sortDirection === 'asc' ? 'A -> Z' : 'Z -> A';
    }
    if (sortField === 'population') {
      return sortDirection === 'asc' ? 'min -> max' : 'max -> min';
    }
    return '';
  };

  return {
    sortField,
    sortDirection,
    changeSortField,
    getSortButtonLabel,
  };
};
