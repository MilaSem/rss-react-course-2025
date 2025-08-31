import React from 'react';
import type { CountryRow } from '@/utils/prepareCountryRow';
import styles from './CO2Subtable.module.css';

interface CO2SubtableProps {
  tableRows: CountryRow[];
  selectedColumns: string[];
  isHighlightRows: boolean;
}

const CO2SubtableComponent = ({
  tableRows,
  selectedColumns,
  isHighlightRows: isHighlightRows,
}: CO2SubtableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Country</th>
          <th>ISO Code</th>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>CO2 per Capita</th>
          {selectedColumns.includes('methane') && <th>Methane</th>}
          {selectedColumns.includes('oil_co2') && <th>Oil CO2</th>}
          {selectedColumns.includes('temperature_change_from_co2') && (
            <th>Temp Change CO2</th>
          )}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <tr key={index} className={isHighlightRows ? styles.highlight : ''}>
            <td>{row.country}</td>
            <td>{row.iso_code}</td>
            <td>{row.year}</td>
            <td>{row.population}</td>
            <td>{row.co2}</td>
            <td>{row.co2_per_capita}</td>
            {selectedColumns.includes('methane') && <td>{row.methane}</td>}
            {selectedColumns.includes('oil_co2') && <td>{row.oil_co2}</td>}
            {selectedColumns.includes('temperature_change_from_co2') && (
              <td>{row.temperature_change_from_co2}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const CO2Subtable = React.memo(CO2SubtableComponent);
