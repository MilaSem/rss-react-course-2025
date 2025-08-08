import { useLocation, useNavigate } from 'react-router';

export const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const searchTerm = params.get('search') ?? '';
  const pageParam = parseInt(params.get('page') ?? '1', 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const updateUrl = (newSearchTerm: string, newPage: number) => {
    const newParams = new URLSearchParams();

    if (newSearchTerm.trim() !== '') {
      newParams.set('search', newSearchTerm);
    }
    newParams.set('page', newPage.toString());

    void navigate(`${location.pathname}?${newParams.toString()}`, {
      replace: true,
    });
  };

  return { searchTerm, currentPage, updateUrl };
};
