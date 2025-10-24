// types/types.ts
import { z } from 'zod';

// Country schema (ersätter Country interface)
export const countrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string(),
  }),
  region: z.string(),
  subregion: z.string().optional(),
  capital: z.array(z.string()).optional(),
  population: z.number().optional(),
  area: z.number().optional(),
  languages: z.record(z.string(), z.string()).optional(),
  currencies: z.record(z.string(), z.object({
    name: z.string(),
    symbol: z.string().optional(),
  })).optional(),
  flags: z.object({
    png: z.string(),
    svg: z.string(),
  }),
  cca2: z.string(),
  cca3: z.string(),
  latlng: z.tuple([z.number(), z.number()]),
  timezones: z.array(z.string()).optional(),
  borders: z.array(z.string()).optional(),
  capitalInfo: z.object({
    latlng: z.tuple([z.number(), z.number()]),
  }).optional(),
  continents: z.array(z.string()).optional(),
});

// Weather schema (matchar befintliga interface structure)
export const weatherSchema = z.object({
  location: z.object({
    city: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  current: z.object({
    temperature: z.number(),
    weatherCode: z.number(),
    weatherDescription: z.string(),
    windSpeed: z.number(),
    humidity: z.number(),
    isDay: z.boolean(),
    time: z.string(),
  }),
});

// Unsplash photo schema (matchar befintliga interface)
export const unsplashPhotoSchema = z.object({
  id: z.string(),
  urls: z.object({
    raw: z.string(),
    full: z.string(),
    regular: z.string(),
    small: z.string(),
    thumb: z.string(),
  }),
  alt_description: z.string().nullable(),
  description: z.string().nullable(),
  user: z.object({
    name: z.string(),
    username: z.string(),
  }),
  links: z.object({
    html: z.string(),
  }),
});

// Unsplash search response schema
export const unsplashSearchResponseSchema = z.object({
  total: z.number(),
  total_pages: z.number(),
  results: z.array(unsplashPhotoSchema),
});

// Wikipedia schema (matchar befintliga interface)
export const wikipediaSchema = z.object({
  type: z.string(),
  title: z.string(),
  displaytitle: z.string(),
  namespace: z.object({
    id: z.number(),
    text: z.string(),
  }),
  wikibase_item: z.string(),
  titles: z.object({
    canonical: z.string(),
    normalized: z.string(),
    display: z.string(),
  }),
  pageid: z.number(),
  thumbnail: z.object({
    source: z.string(),
    width: z.number(),
    height: z.number(),
  }).optional(),
  originalimage: z.object({
    source: z.string(),
    width: z.number(),
    height: z.number(),
  }).optional(),
  lang: z.string(),
  dir: z.string(),
  revision: z.string(),
  tid: z.string(),
  timestamp: z.string(),
  description: z.string(),
  description_source: z.string(),
  content_urls: z.object({
    desktop: z.object({
      page: z.string(),
      revisions: z.string(),
      edit: z.string(),
      talk: z.string(),
    }),
    mobile: z.object({
      page: z.string(),
      revisions: z.string(),
      edit: z.string(),
      talk: z.string(),
    }),
  }),
  extract: z.string(),
  extract_html: z.string(),
});

// API parameter schemas (support both filled and empty objects)
export const fetchCountriesParamsSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(300).optional(),
  search: z.string().optional(),
  region: z.string().optional(),
}).optional().default({});

// Response schemas
export const countriesResponseSchema = z.object({
  countries: z.array(countrySchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export const serverCountryDataSchema = z.object({
  country: countrySchema,
  wikipedia: wikipediaSchema.nullable(),
  weather: weatherSchema.nullable(),
  photos: z.array(unsplashPhotoSchema),
});

// Search schema with improved validation
export const searchSchema = z.object({
  query: z.string()
    .max(50, 'Search query must be less than 50 characters')
    .regex(/^[a-zA-ZåäöÅÄÖ\s\-']*$/, 'Search query can only contain letters, spaces, hyphens and apostrophes')
    .transform(val => val.trim())
    .optional()
    .or(z.literal(''))
});

// Export types (inferred from schemas)
export type Country = z.infer<typeof countrySchema>;
export type WeatherData = z.infer<typeof weatherSchema>;
export type UnsplashPhoto = z.infer<typeof unsplashPhotoSchema>;
export type UnsplashSearchResponse = z.infer<typeof unsplashSearchResponseSchema>;
export type WikipediaPageSummary = z.infer<typeof wikipediaSchema>;
export type FetchCountriesParams = z.infer<typeof fetchCountriesParamsSchema>;
export type CountriesResponse = z.infer<typeof countriesResponseSchema>;
export type ServerCountryData = z.infer<typeof serverCountryDataSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;

// Additional utility types
export interface Region {
  value: string;
  label: string;
}

// Weather service types (för interna transformations)
export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    is_day: number;
    last_updated: string;
  };
}

// Open-Meteo API response interface
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };
}

// Weather icon type
export type WeatherIconType = string;

// Weather code info interface
export interface WeatherCodeInfo {
  description: string;
  icon: string;
  dayIcon?: string;
  nightIcon?: string;
}

// Transform weather API response to our schema
export const transformWeatherData = (apiData: WeatherApiResponse): WeatherData => {
  return weatherSchema.parse({
    location: {
      name: apiData.location.name,
      country: apiData.location.country,
    },
    current: {
      temp_c: apiData.current.temp_c,
      condition: {
        text: apiData.current.condition.text,
        icon: apiData.current.condition.icon,
      },
      humidity: apiData.current.humidity,
      wind_kph: apiData.current.wind_kph,
    },
  });
};