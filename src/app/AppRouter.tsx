import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { MainPage } from './routes/MainPage/MainPage';
import { Page404 } from './routes/Page404/Page404';
import { AboutPage } from './routes/AboutPage/AboutPage';
import { AnimeDetails } from '@/components/AnimeDetails/AnimeDetails';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="" element={<AnimeDetails />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};
