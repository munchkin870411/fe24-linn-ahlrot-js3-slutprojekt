export interface Country {
  name: {
    common: string;
    official: string;
  };
  region: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
  };
  cca2: string;
  cca3: string;
  capitalInfo?: {
    latlng: [number, number];
  };
  latlng: [number, number];
}

export interface FetchCountriesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  region?: string;
}

export interface CountriesResponse {
  countries: Country[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}