import { useState } from 'react';
import type { GlobalCO2Data } from '@/types/CO2Data';
import { co2DataResource } from '@/resources';
import { prepareCountryRow } from '@/utils/prepareCountryRow';
import { CO2TableSettings } from '../CO2TableSettings/CO2TableSettings';

import styles from './CO2Table.module.css';

export const CO2Table = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const data: GlobalCO2Data = co2DataResource.read();

  const tableRows = Object.entries(data).map(([country, countryData]) => {
    const row = prepareCountryRow(country, countryData);
    return row;
  });

  const handleFieldChange = (field: string, checked: boolean) => {
    setSelectedFields((prev) =>
      checked ? [...prev, field] : prev.filter((f) => f !== field),
    );
  };

  return (
    <>
      <button className={styles.settings} onClick={() => setModalOpen(true)}>
        Set up columns
      </button>

      <CO2TableSettings
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedFields={selectedFields}
        onChange={handleFieldChange}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Country</th>
            <th>ISO Code</th>
            <th>Year</th>
            <th>Population</th>
            <th>CO2</th>
            <th>CO2 per Capita</th>
            {selectedFields.includes('methane') && <th>Methane</th>}
            {selectedFields.includes('oil_co2') && <th>Oil CO2</th>}
            {selectedFields.includes('temperature_change_from_co2') && (
              <th>Temp Change CO2</th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index}>
              <td>{row.country}</td>
              <td>{row.iso_code}</td>
              <td>{row.year}</td>
              <td>{row.population}</td>
              <td>{row.co2}</td>
              <td>{row.co2_per_capita}</td>
              {selectedFields.includes('methane') && <td>{row.methane}</td>}
              {selectedFields.includes('oil_co2') && <td>{row.oil_co2}</td>}
              {selectedFields.includes('temperature_change_from_co2') && (
                <td>{row.temperature_change_from_co2}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
