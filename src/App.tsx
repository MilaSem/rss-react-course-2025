import { Suspense } from 'react';
import { Spinner } from './components/Spinner/Spinner';
import { CO2Table } from './components/CO2Table/CO2Table';

export const App = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <h1>CO2 emissions</h1>
        <CO2Table />
      </Suspense>
    </>
  );
};
