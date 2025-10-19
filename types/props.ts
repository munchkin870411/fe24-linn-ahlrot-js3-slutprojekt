// Component Props Types

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export interface RegionFilterProps {
  onRegionChange?: (region: string) => void;
  className?: string;
}