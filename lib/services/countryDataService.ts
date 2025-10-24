import { 
  Country,
  FetchCountriesParams,
  CountriesResponse,
  ServerCountryData
} from '@/types/types';
import { fetchAllCountries, fetchSingleCountry } from './restCountriesService';
import { fetchCountryWikipedia } from './wikipediaService';
import { fetchWeatherForCountry } from './weatherService';
import { getCountryPhotos } from './unsplashService';

/**
 * Fetch multiple countries with pagination, search, and filtering
 */
export async function fetchCountries(params: FetchCountriesParams = {}): Promise<CountriesResponse> {
  // Simple parameter validation and defaults
  const validatedParams = {
    page: Math.max(1, params?.page || 1),
    pageSize: Math.min(300, Math.max(1, params?.pageSize || 12)),
    search: params?.search?.trim(),
    region: params?.region?.trim(),
  };
  
  try {
    const allCountries = await fetchAllCountries();
    const filteredCountries = filterCountries(allCountries, validatedParams);
    
    return paginateCountries(filteredCountries, validatedParams);
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
    const country = await fetchSingleCountry(countryCode);
    
    if (!country) {
      return null;
    }

    // Fetch additional data with validation (now handled in each service)
    const [wikipediaResult, weatherResult, photosResult] = await Promise.allSettled([
      fetchCountryWikipedia(country.name.common),
      fetchWeatherForCountry(
        country.capital?.[0] || country.name.common, 
        country.name.common, 
        country.latlng ? country.latlng as [number, number] : undefined
      ),
      getCountryPhotos(country.name.common),
    ]);

    return {
      country,
      wikipedia: wikipediaResult.status === 'fulfilled' ? wikipediaResult.value : null,
      weather: weatherResult.status === 'fulfilled' ? weatherResult.value : null,
      photos: photosResult.status === 'fulfilled' ? photosResult.value : [],
    };
  } catch (error) {
    console.error('Server error:', error);
    return null;
  }
}

/**
 * Filter countries based on search and region parameters
 */
function filterCountries(countries: Country[], params: {
  search?: string;
  region?: string;
}): Country[] {
  let filtered = countries;
  
  if (params.search) {
    const searchQuery = params.search.toLowerCase();
    filtered = filtered.filter(country =>
      country.name.common.toLowerCase().includes(searchQuery) ||
      country.name.official.toLowerCase().includes(searchQuery)
    );
  }
  
  if (params.region) {
    filtered = filtered.filter(country =>
      country.region.toLowerCase() === params.region?.toLowerCase()
    );
  }
  
  return filtered;
}

/**
 * Paginate countries array
 */
function paginateCountries(countries: Country[], params: {
  page: number;
  pageSize: number;
}): CountriesResponse {
  const total = countries.length;
  const totalPages = Math.ceil(total / params.pageSize);
  
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedCountries = countries.slice(start, end);

  return {
    countries: paginatedCountries,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages,
  };
}