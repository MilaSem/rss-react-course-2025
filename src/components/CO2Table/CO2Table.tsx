import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
} from 'react';
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

  const filteredCountriesByName = useMemo(
    () => filterCountriesByName(data, searchTerm),
    [data, searchTerm],
  );

  const allYears = useMemo(() => getAllYears(data), [data]);

  if (selectedYear === null && allYears.length > 0) {
    setSelectedYear(allYears[0]);
  }

  const tableRows = useMemo(
    () =>
      filteredCountriesByName.map((country) => {
        const countryData = data[country];
        return prepareCountryRow(country, countryData, selectedYear);
      }),
    [filteredCountriesByName, selectedYear, data],
  );

  const handleYearChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value, 10);
    setSelectedYear(year);
    setIsHighlightRows(true);
  }, []);

  const handleColumnChange = useCallback((column: string, checked: boolean) => {
    setSelectedColumns((prev) =>
      checked ? [...prev, column] : prev.filter((c) => c !== column),
    );
  }, []);

  const onOpenModal = useCallback(() => setModalOpen(true), []);
  const onCloseModal = useCallback(() => setModalOpen(false), []);

  const { sortField, sortDirection, changeSortField, getSortButtonLabel } =
    useSorting();

  const handleSortFieldSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as 'name' | 'population';
      changeSortField(value);
    },
    [changeSortField],
  );

  const handleSortButtonClick = useCallback(() => {
    changeSortField(sortField);
  }, [changeSortField, sortField]);

  const sortedRows = useMemo(
    () => sortRows(tableRows, sortField, sortDirection),
    [tableRows, sortField, sortDirection],
  );

  useEffect(() => {
    if (isHighlightRows) {
      const timer = setTimeout(() => setIsHighlightRows(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isHighlightRows]);

  return (
    <>
      <ControlPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        allYears={allYears}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        isModalOpen={isModalOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
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
