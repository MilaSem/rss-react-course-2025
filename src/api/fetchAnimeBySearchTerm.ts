import { fetchAnimeData } from './fetchAnimeData';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from './constants';
import type { ApiResponse } from './fetchAnimeData';

export const fetchAnimeBySearchTerm = async (
  searchTerm: string,
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE,
): Promise<ApiResponse> => {
  const query = `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
        }
        media(search: $search, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
          }
          status
          description(asHtml: false)
        }
      }
    }
  `;
  const variables = { search: searchTerm, page, perPage };

  return fetchAnimeData(query, variables);
};
