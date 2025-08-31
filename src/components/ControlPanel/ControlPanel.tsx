import type { ChangeEvent } from 'react';
import { CO2TableSettings } from '../CO2TableSettings/CO2TableSettings';
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
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

export const ControlPanel = ({
  searchTerm,
  onSearchChange,
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

      <div className={styles.sorter}>
        <label>
          Sort by:
          <select value={sortField} onChange={handleSortFieldSelect}>
            <option value="name">Country Name</option>
            <option value="population">Population</option>
          </select>
        </label>
        <button className={styles.direction} onClick={handleSortButtonClick}>
          {getSortButtonLabel()}
        </button>
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
