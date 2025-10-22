import { fetchCountries } from './countriesService';
import { fetchCountryWikipedia } from './wikipediaService';
import { fetchWeatherForCountry } from './weatherService';
import { getCountryPhotos } from './unsplashService';
import { Country, WikipediaPageSummary } from '@/types/country';
import { WeatherData } from '@/types/weather';
import { UnsplashPhoto } from './unsplashService';
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

    // Weather data (optional)
    let weather: WeatherData | null = null;
    try {
      const capitalName = country.capital?.[0] || country.name.common;
      const countryName = country.name.common;
      const coordinates = country.latlng;
      
      weather = await fetchWeatherForCountry(capitalName, countryName, coordinates);
    } catch {
      console.warn(`Weather unavailable for ${country.name.common}`);
    }

    // Unsplash photos (optional)
    let photos: UnsplashPhoto[] = [];
    try {
      photos = await getCountryPhotos(country.name.common);
    } catch {
      console.warn(`Photos unavailable for ${country.name.common}`);
    }

    return { country, wikipedia, weather, photos };
  } catch (error) {
    console.error('Server error:', error);
    return null;
  }
}