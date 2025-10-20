import { fetchCountries } from './countriesService';
import { fetchCountryWikipedia } from './wikipediaService';
import { Country, WikipediaPageSummary } from '@/types/country';
import { ServerCountryData } from '@/types/api';

export async function fetchCountryServerSide(
  countryCode: string
): Promise<ServerCountryData | null> {
  try {
    // Hämta länder direkt från externa API:er (server-side)
    const countriesData = await fetchCountries({ pageSize: 300 });
    
    const country = countriesData.countries.find((c: Country) =>
      c.cca3.toLowerCase() === countryCode.toLowerCase() ||
      c.cca2.toLowerCase() === countryCode.toLowerCase()
    );

    if (!country) {
      return null;
    }

    // Wikipedia data (optional)
    let wikipedia: WikipediaPageSummary | null = null;
    try {
      wikipedia = await fetchCountryWikipedia(country.name.common);
    } catch {
      console.warn(`Wikipedia unavailable for ${country.name.common}`);
    }

    return { country, wikipedia };
  } catch (error) {
    console.error('Server error:', error);
    return null;
  }
}