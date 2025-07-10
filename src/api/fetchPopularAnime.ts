import { ApiResponse, fetchAnimeData } from './fetchAnimeData';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export const fetchPopularAnime = async (
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PER_PAGE,
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
