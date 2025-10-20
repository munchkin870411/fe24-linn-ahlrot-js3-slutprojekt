export interface Country {
  name: {
    common: string;
    official: string;
  };
  region: string;
  subregion?: string;
  capital?: string[];
  population?: number;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, {
    name: string;
    symbol?: string;
  }>;
  borders?: string[];
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
  timezones?: string[];
  continents?: string[];
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

// Region type for filter buttons
export interface Region {
  value: string;
  label: string;
}

// Wikipedia API types
export interface WikipediaPageSummary {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  };
  extract: string;
  extract_html: string;
}