import { Country, countrySchema } from '@/types/types';
import { z } from 'zod';

const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';

/**
 * Fetch all countries from REST Countries API
 */
export async function fetchAllCountries(): Promise<Country[]> {
  // Only request the fields we actually use
  const fields = [
    'name',
    'cca2',
    'cca3',
    'region',
    'capital',
    'latlng',
    'flags'
  ].join(',');
  try {
    // First try: /all endpoint with fields param
    const response = await fetch(`${REST_COUNTRIES_BASE_URL}/all?fields=${fields}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Country Explorer App',
      },
      next: { revalidate: 86400 }
    });
    
    if (response.ok) {
      const rawData = await response.json();
      
      // Validate data with Zod
      const validationResult = z.array(countrySchema).safeParse(rawData);
      
      if (!validationResult.success) {
        console.warn('Invalid country data:', validationResult.error);
        return rawData as Country[]; // Fallback to unvalidated data
      }
      
      return validationResult.data;
    } else {
      throw new Error(`/all endpoint failed: ${response.status}`);
    }
  } catch {
    console.warn('Failed to fetch /all, trying region approach');
    // Fallback: fetch by regions
    const result = await fetchCountriesByRegions();
    console.log(`Fallback successful: fetched ${result.length} countries from regions`);
    return result;
  }
}

/**
 * Fetch a single country by country code
 */
export async function fetchSingleCountry(countryCode: string): Promise<Country | null> {
  try {
    const response = await fetch(
      `${REST_COUNTRIES_BASE_URL}/alpha/${countryCode}`,
      { 
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Country Explorer App',
        },
        next: { revalidate: 86400 } 
      }
    );

    if (!response.ok) {
      console.warn(`Country not found: ${countryCode}`);
      return null;
    }

    const rawData = await response.json();
    
    // Validate data with Zod
    const validationResult = z.array(countrySchema).safeParse(rawData);
    
    if (!validationResult.success) {
      console.warn('Invalid country data:', validationResult.error);
      return null;
    }
    
    const countries = validationResult.data;
    return countries[0] || null; // REST Countries returns array even for single country
  } catch (error) {
    console.error('Error fetching single country:', error);
    return null;
  }
}

/**
 * Fallback method: fetch countries by regions and combine
 */
async function fetchCountriesByRegions(): Promise<Country[]> {
  const regions = ['Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Antarctic'];
  
  const regionPromises = regions.map(async (region) => {
    try {
      const response = await fetch(`${REST_COUNTRIES_BASE_URL}/region/${region}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Country Explorer App',
        },
        next: { revalidate: 86400 }
      });
      
      if (response.ok) {
        const rawData = await response.json();
        
        // Validate data with Zod
        const validationResult = z.array(countrySchema).safeParse(rawData);
        
        if (validationResult.success) {
          return validationResult.data;
        } else {
          console.warn('Invalid country data for region:', validationResult.error);
          return [];
        }
      }
      console.warn(`Failed to fetch region ${region}: ${response.status}`);
      return [];
    } catch (regionError) {
      console.warn(`Error fetching region ${region}:`, regionError);
      return [];
    }
  });
  
  const regionResults = await Promise.all(regionPromises);
  return regionResults.flat();
}