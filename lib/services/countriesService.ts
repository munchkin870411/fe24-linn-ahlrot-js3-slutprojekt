import axios from 'axios';
import { Country, FetchCountriesParams, CountriesResponse } from '@/types/country';

const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';
const REQUIRED_FIELDS = 'name,region,capital,flags,cca2,cca3,capitalInfo,latlng';

export async function fetchCountries(params: FetchCountriesParams = {}): Promise<CountriesResponse> {
  // Simple parameter validation and defaults
  const validatedParams = {
    page: Math.max(1, params.page || 1),
    pageSize: Math.min(50, Math.max(1, params.pageSize || 12)),
    search: params.search?.trim(),
    region: params.region?.trim(),
  };
  
  const response = await axios.get<Country[]>(
    `${REST_COUNTRIES_BASE_URL}/all?fields=${REQUIRED_FIELDS}`
  );

  let filteredCountries = response.data;
  
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
}