import { fetchAnimeData } from './fetchAnimeData';
import type { Media } from '@/types/anilistTypes';

export const fetchAnimeById = async (id: number): Promise<Media> => {
  const query = `
    query ($id: Int) {
      Media(id: $id) {
        id
        title {
          romaji
          english
          native
        }
        description(asHtml: false)
        genres
        episodes
        seasonYear
        status
        averageScore
        coverImage {
          extraLarge
          large
          medium
          color
        }
        siteUrl
      }
    }
  `;

  const variables = { id };

  const response = await fetchAnimeData<{ Media: Media }>(query, variables);

  return response.data.Media;
};
