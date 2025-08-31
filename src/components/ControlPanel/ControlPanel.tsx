import React, { useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { CO2TableSettings } from '../CO2TableSettings/CO2TableSettings';

import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  allYears: number[];
  selectedYear: number | null;
  onYearChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  selectedColumns: string[];
  onColumnChange: (field: string, checked: boolean) => void;
  sortField: 'name' | 'population';
  getSortButtonLabel: () => string;
  handleSortFieldSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSortButtonClick: () => void;
}

const ControlPanelComponent = ({
  searchTerm,
  onSearchChange,
  allYears,
  selectedYear,
  onYearChange,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  selectedColumns: selectedFields,
  onColumnChange: onFieldChange,
  sortField,
  getSortButtonLabel,
  handleSortFieldSelect,
  handleSortButtonClick,
}: ControlPanelProps) => {
  const yearOptions = useMemo(() => {
    return allYears.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }, [allYears]);

  return (
    <div className={styles.control}>
      <input
        className={styles.search}
        id="country-search"
        type="search"
        placeholder="Country Name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className={styles.selectors}>
        <div className={styles.year}>
          <label>
            Select year:
            <select
              id="year-select"
              value={selectedYear ?? ''}
              onChange={onYearChange}
            >
              {yearOptions}
            </select>
          </label>
        </div>

        <div className={styles.sorter}>
          <label>
            Sort by:
            <select
              id="sort-field-select"
              value={sortField}
              onChange={handleSortFieldSelect}
            >
              <option value="name">Country Name</option>
              <option value="population">Population</option>
            </select>
          </label>
          <button className={styles.direction} onClick={handleSortButtonClick}>
            {getSortButtonLabel()}
          </button>
        </div>
      </div>

      <button className={styles.settings} onClick={onOpenModal}>
        Set up columns
      </button>

      <CO2TableSettings
        isOpen={isModalOpen}
        onClose={onCloseModal}
        selectedFields={selectedFields}
        onChange={onFieldChange}
      />
    </div>
  );
};

export const ControlPanel = React.memo(ControlPanelComponent);
