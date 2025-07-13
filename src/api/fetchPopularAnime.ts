import { fetchAnimeData } from './fetchAnimeData';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from './constants';
import type { ApiResponse } from './fetchAnimeData';

export const fetchPopularAnime = async (
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE,
): Promise<ApiResponse> => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC) {
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
  const variables = { page, perPage };

  return fetchAnimeData(query, variables);
};
