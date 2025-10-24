import { WeatherCodeInfo } from '@/types/types';

/**
 * WMO Weather Interpretation Codes
 * Official standard from World Meteorological Organization
 * Used by Open-Meteo and other weather services
 */
export const WMO_WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  // Clear conditions
  0: { 
    description: 'Clear sky', 
    icon: '☀️', 
    dayIcon: '☀️', 
    nightIcon: '🌙' 
  },
  1: { 
    description: 'Mostly clear', 
    icon: '🌤️', 
    dayIcon: '🌤️', 
    nightIcon: '🌙' 
  },
  2: { 
    description: 'Partly cloudy', 
    icon: '⛅', 
    dayIcon: '⛅', 
    nightIcon: '☁️' 
  },
  3: { 
    description: 'Cloudy', 
    icon: '☁️' 
  },

  // Fog
  45: { 
    description: 'Fog', 
    icon: '🌫️' 
  },
  48: { 
    description: 'Rime fog', 
    icon: '🌫️' 
  },

  // Drizzle
  51: { 
    description: 'Light drizzle', 
    icon: '🌧️' 
  },
  53: { 
    description: 'Moderate drizzle', 
    icon: '🌧️' 
  },
  55: { 
    description: 'Heavy drizzle', 
    icon: '🌧️' 
  },

  // Rain
  61: { 
    description: 'Light rain', 
    icon: '🌧️' 
  },
  63: { 
    description: 'Moderate rain', 
    icon: '🌧️' 
  },
  65: { 
    description: 'Heavy rain', 
    icon: '🌧️' 
  },

  // Snow
  71: { 
    description: 'Light snow', 
    icon: '🌨️' 
  },
  73: { 
    description: 'Moderate snow', 
    icon: '🌨️' 
  },
  75: { 
    description: 'Heavy snow', 
    icon: '🌨️' 
  },

  // Rain showers
  80: { 
    description: 'Light rain showers', 
    icon: '🌧️' 
  },
  81: { 
    description: 'Moderate rain showers', 
    icon: '🌧️' 
  },
  82: { 
    description: 'Heavy rain showers', 
    icon: '🌧️' 
  },

  // Thunderstorms
  95: { 
    description: 'Thunderstorm', 
    icon: '⛈️' 
  },
  96: { 
    description: 'Thunderstorm with light hail', 
    icon: '⛈️' 
  },
  99: { 
    description: 'Thunderstorm with heavy hail', 
    icon: '⛈️' 
  }
};

/**
 * Get weather information by code
 */
export function getWeatherInfo(code: number): WeatherCodeInfo | null {
  return WMO_WEATHER_CODES[code] || null;
}

/**
 * Get all available weather codes
 */
export function getAllWeatherCodes(): number[] {
  return Object.keys(WMO_WEATHER_CODES).map(Number);
}