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
    // Fetch specific country directly from REST Countries
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
      { next: { revalidate: 86400 } }
    );

    if (!response.ok) {
      console.warn(`Country not found: ${countryCode}`);
      return null;
    }

    const countryArray: Country[] = await response.json();
    const country = countryArray[0]; // REST Countries returns array even for single country

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