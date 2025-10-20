import axios from 'axios';
import { WikipediaPageSummary } from '@/types/country';

const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary';

export async function fetchCountryWikipedia(countryName: string): Promise<WikipediaPageSummary> {
  try {
    // Format country name for Wikipedia (replace spaces with underscores)
    const formattedName = countryName.replace(/\s+/g, '_');
    
    const response = await axios.get<WikipediaPageSummary>(
      `${WIKIPEDIA_BASE_URL}/${encodeURIComponent(formattedName)}`
    );

    if (!response.data) {
      throw new Error(`No Wikipedia data found for ${countryName}`);
    }

    return response.data;
  } catch (error) {
    console.warn(`Could not fetch Wikipedia data for ${countryName}:`, error);
    throw new Error(`Wikipedia data not available for ${countryName}`);
  }
}