import { ApiResponse, fetchAnimeData } from './fetchAnimeData';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export const fetchAnimeBySearchTerm = async (
  searchTerm: string,
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PER_PAGE,
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
