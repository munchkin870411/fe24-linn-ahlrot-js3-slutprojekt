import { Country, WikipediaPageSummary } from './country';

/**
 * Response interface for country API endpoint
 * Combines data from REST Countries API and Wikipedia
 */
export interface CountryApiResponse {
  country: Country;
  wikipedia: WikipediaPageSummary | null;
}

/**
 * Server-side country data interface
 * Used for server-side rendering and data fetching
 */
export interface ServerCountryData {
  country: Country;
  wikipedia: WikipediaPageSummary | null;
}

/**
 * Standard error response interface for API endpoints
 */
export interface ErrorResponse {
  error: string;
  code?: string;
}

/**
 * Generic API error interface for client-side error handling
 */
export interface ApiError {
  error: string;
  code?: string;
}