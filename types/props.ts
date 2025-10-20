// Component Props Types

import { Country, WikipediaPageSummary } from './country';

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
 * ErrorDisplay component props
 */
export interface ErrorDisplayProps {
  error: Error | null;
  isNotFound?: boolean;
  countryCode?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  className?: string;
}