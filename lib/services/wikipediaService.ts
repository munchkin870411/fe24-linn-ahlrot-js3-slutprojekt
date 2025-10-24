import axios from 'axios';
import { WikipediaPageSummary, wikipediaSchema } from '@/types/types';

const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary';

/**
 * Fetch and validate Wikipedia data for a country
 */
export async function fetchCountryWikipedia(countryName: string): Promise<WikipediaPageSummary | null> {
  try {
    // Format country name for Wikipedia (replace spaces with underscores)
    const formattedName = countryName.replace(/\s+/g, '_');
    
    const response = await axios.get(
      `${WIKIPEDIA_BASE_URL}/${encodeURIComponent(formattedName)}`
    );

    if (!response.data) {
      return null;
    }

    // Validate with Zod schema
    const result = wikipediaSchema.safeParse(response.data);
    
    if (!result.success) {
      console.warn('Invalid Wikipedia data:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.warn(`Could not fetch Wikipedia data for ${countryName}:`, error);
    return null;
  }
}