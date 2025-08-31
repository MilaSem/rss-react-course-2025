import type { GlobalCO2Data } from '@/types/CO2Data';
import { co2DataResource } from '@/resources';
import { prepareCountryRow } from '@/utils/prepareCountryRow';

import styles from './CO2Table.module.css';

export const CO2Table = () => {
  const data: GlobalCO2Data = co2DataResource.read();

  const tableRows = Object.entries(data).map(([country, countryData]) => {
    const row = prepareCountryRow(country, countryData);
    return row;
  });

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
          </tr>
        ))}
      </tbody>
    </table>
  );
};
