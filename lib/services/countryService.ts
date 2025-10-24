import { fetchCountryWikipedia } from './wikipediaService';
import { fetchWeatherForCountry } from './weatherService';
import { getCountryPhotos } from './unsplashService';
import { Country, WikipediaPageSummary, FetchCountriesParams, CountriesResponse } from '@/types/country';
import { WeatherData } from '@/types/weather';
import { UnsplashPhoto } from './unsplashService';
import { ServerCountryData } from '@/types/api';

const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';

/**
 * Fetch multiple countries with pagination, search, and filtering
 */
export async function fetchCountries(params: FetchCountriesParams = {}): Promise<CountriesResponse> {
  // Simple parameter validation and defaults
  const validatedParams = {
    page: Math.max(1, params.page || 1),
    pageSize: Math.min(300, Math.max(1, params.pageSize || 12)), // Increase from 50 to 300
    search: params.search?.trim(),
    region: params.region?.trim(),
  };
  
  try {
    let allCountries: Country[] = [];
    
    // Try different approaches to get countries data
    try {
      // First try: /all endpoint without fields
      const response = await fetch(`${REST_COUNTRIES_BASE_URL}/all`, {
        next: { revalidate: 86400 }
      });
      
      if (response.ok) {
        allCountries = await response.json();
      } else {
        throw new Error(`/all endpoint failed: ${response.status}`);
      }
    } catch {
      console.warn('Failed to fetch /all, trying region approach');
      
      // Fallback: fetch by regions and combine
      const regions = ['Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Antarctic'];
      const regionPromises = regions.map(async (region) => {
        try {
          const response = await fetch(`${REST_COUNTRIES_BASE_URL}/region/${region}`, {
            next: { revalidate: 86400 }
          });
          if (response.ok) {
            return await response.json();
          }
          console.warn(`Failed to fetch region ${region}: ${response.status}`);
          return [];
        } catch (regionError) {
          console.warn(`Error fetching region ${region}:`, regionError);
          return [];
        }
      });
      
      const regionResults = await Promise.all(regionPromises);
      allCountries = regionResults.flat();
    }
    
    let filteredCountries = allCountries;
    
    if (validatedParams.search) {
      const searchQuery = validatedParams.search.toLowerCase();
      filteredCountries = filteredCountries.filter((country: Country) =>
        country.name.common.toLowerCase().includes(searchQuery) ||
        country.name.official.toLowerCase().includes(searchQuery)
      );
    }
    
    if (validatedParams.region) {
      filteredCountries = filteredCountries.filter((country: Country) =>
        country.region.toLowerCase() === validatedParams.region?.toLowerCase()
      );
    }
    
    const total = filteredCountries.length;
    const totalPages = Math.ceil(total / validatedParams.pageSize);
    
    const start = (validatedParams.page - 1) * validatedParams.pageSize;
    const end = start + validatedParams.pageSize;
    const paginatedCountries = filteredCountries.slice(start, end);

    return {
      countries: paginatedCountries,
      total,
      page: validatedParams.page,
      pageSize: validatedParams.pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    throw new Error('Unable to load countries data');
  }
}

/**
 * Fetch detailed data for a single country with additional services
 */
export async function getCountryData(
  countryCode: string
): Promise<ServerCountryData | null> {
  try {
    // Fetch specific country directly from REST Countries
    const response = await fetch(
      `${REST_COUNTRIES_BASE_URL}/alpha/${countryCode}`,
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