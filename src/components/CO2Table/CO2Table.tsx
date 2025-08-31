import { useEffect, useState, type ChangeEvent } from 'react';
import type { GlobalCO2Data } from '@/types/CO2Data';
import { co2DataResource } from '@/resources';
import { prepareCountryRow } from '@/utils/prepareCountryRow';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { filterCountriesByName } from '@/utils/filterCountiesByName';
import { CO2Subtable } from './CO2Subtable';
import { sortRows } from '@/utils/sortRows';
import { useSorting } from '@/hooks/useSorting';
import { getAllYears } from '@/utils/getAllYears';

export const CO2Table = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isHighlightRows, setIsHighlightRows] = useState(false);

  const data: GlobalCO2Data = co2DataResource.read();

  const filteredCountriesByName = filterCountriesByName(data, searchTerm);

  const allYears = getAllYears(data);

  if (selectedYear === null && allYears.length > 0) {
    setSelectedYear(allYears[0]);
  }

  const tableRows = filteredCountriesByName.map((country) => {
    const countryData = data[country];
    const row = prepareCountryRow(country, countryData, selectedYear);
    return row;
  });

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value, 10);
    setSelectedYear(year);
    setIsHighlightRows(true);
  };

  useEffect(() => {
    if (isHighlightRows) {
      const timer = setTimeout(() => setIsHighlightRows(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isHighlightRows]);

  const handleColumnChange = (column: string, checked: boolean) => {
    setSelectedColumns((prev) =>
      checked ? [...prev, column] : prev.filter((c) => c !== column),
    );
  };

  const { sortField, sortDirection, changeSortField, getSortButtonLabel } =
    useSorting();

  const sortedRows = sortRows(tableRows, sortField, sortDirection);

  const handleSortFieldSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'name' | 'population';
    changeSortField(value);
  };

  const handleSortButtonClick = () => {
    changeSortField(sortField);
  };

  return (
    <>
      <ControlPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        allYears={allYears}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        isModalOpen={isModalOpen}
        onOpenModal={() => setModalOpen(true)}
        onCloseModal={() => setModalOpen(false)}
        selectedColumns={selectedColumns}
        onColumnChange={handleColumnChange}
        sortField={sortField}
        getSortButtonLabel={getSortButtonLabel}
        handleSortFieldSelect={handleSortFieldSelect}
        handleSortButtonClick={handleSortButtonClick}
      />

      <CO2Subtable
        tableRows={sortedRows}
        selectedColumns={selectedColumns}
        isHighlightRows={isHighlightRows}
      />
    </>
  );
};
