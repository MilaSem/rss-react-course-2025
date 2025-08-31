import { useState, type ChangeEvent } from 'react';
import type { GlobalCO2Data } from '@/types/CO2Data';
import { co2DataResource } from '@/resources';
import { prepareCountryRow } from '@/utils/prepareCountryRow';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { filterCountriesByName } from '@/utils/filterCountiesByName';
import { CO2Subtable } from './CO2Subtable';
import { sortRows } from '@/utils/sortRows';
import { useSorting } from '@/hooks/useSorting';

export const CO2Table = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const data: GlobalCO2Data = co2DataResource.read();

  const filteredCountriesByName = filterCountriesByName(data, searchTerm);

  const tableRows = filteredCountriesByName.map((country) => {
    const countryData = data[country];
    const row = prepareCountryRow(country, countryData);
    return row;
  });

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

      <CO2Subtable tableRows={sortedRows} selectedColumns={selectedColumns} />
    </>
  );
};
