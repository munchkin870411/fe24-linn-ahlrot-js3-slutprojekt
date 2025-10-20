import { WeatherCodeInfo } from '@/types/weather';

/**
 * WMO Weather Interpretation Codes
 * Official standard from World Meteorological Organization
 * Used by Open-Meteo and other weather services
 */
export const WMO_WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  // Clear conditions
  0: { 
    description: 'Klar himmel', 
    icon: '☀️', 
    dayIcon: '☀️', 
    nightIcon: '🌙' 
  },
  1: { 
    description: 'Mestadels klart', 
    icon: '🌤️', 
    dayIcon: '🌤️', 
    nightIcon: '🌙' 
  },
  2: { 
    description: 'Delvis molnigt', 
    icon: '⛅', 
    dayIcon: '⛅', 
    nightIcon: '☁️' 
  },
  3: { 
    description: 'Mulet', 
    icon: '☁️' 
  },

  // Fog
  45: { 
    description: 'Dimma', 
    icon: '🌫️' 
  },
  48: { 
    description: 'Rimfrost dimma', 
    icon: '🌫️' 
  },

  // Drizzle
  51: { 
    description: 'Lätt duggregn', 
    icon: '🌧️' 
  },
  53: { 
    description: 'Måttligt duggregn', 
    icon: '🌧️' 
  },
  55: { 
    description: 'Kraftigt duggregn', 
    icon: '🌧️' 
  },

  // Rain
  61: { 
    description: 'Lätt regn', 
    icon: '🌧️' 
  },
  63: { 
    description: 'Måttligt regn', 
    icon: '🌧️' 
  },
  65: { 
    description: 'Kraftigt regn', 
    icon: '🌧️' 
  },

  // Snow
  71: { 
    description: 'Lätt snöfall', 
    icon: '🌨️' 
  },
  73: { 
    description: 'Måttligt snöfall', 
    icon: '🌨️' 
  },
  75: { 
    description: 'Kraftigt snöfall', 
    icon: '🌨️' 
  },

  // Rain showers
  80: { 
    description: 'Lätta regnskurar', 
    icon: '🌧️' 
  },
  81: { 
    description: 'Måttliga regnskurar', 
    icon: '🌧️' 
  },
  82: { 
    description: 'Kraftiga regnskurar', 
    icon: '🌧️' 
  },

  // Thunderstorms
  95: { 
    description: 'Åska', 
    icon: '⛈️' 
  },
  96: { 
    description: 'Åska med lätt hagel', 
    icon: '⛈️' 
  },
  99: { 
    description: 'Åska med kraftigt hagel', 
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