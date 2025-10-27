// Component Props Types

import { Country, WikipediaPageSummary, WeatherData } from './types';

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export interface RegionFilterProps {
  onRegionChange?: (region: string) => void;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  className?: string;
}

export interface CountryDetailsProps {
  country: Country;
}

/**
 * Extended props for CountryDetails component including Wikipedia data
 */
export interface CountryDetailsComponentProps extends CountryDetailsProps {
  wikipediaData?: WikipediaPageSummary | null;
}

/**
 * LoadingSpinner component props
 */
export interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

/**
 * WeatherDisplay component props
 */
export interface WeatherDisplayProps {
  weather: WeatherData | null;
  className?: string;
}