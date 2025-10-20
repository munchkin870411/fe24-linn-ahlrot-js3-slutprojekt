/**
 * Weather data interfaces for Open-Meteo API
 */

export interface WeatherData {
  current: CurrentWeather;
  location: WeatherLocation;
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  weatherDescription: string;
  windSpeed: number;
  humidity: number;
  isDay: boolean;
  time: string;
}

export interface WeatherLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

/**
 * Open-Meteo API response interface
 */
export interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };
  current_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    weather_code: string;
    wind_speed_10m: string;
    is_day: string;
  };
}

/**
 * Weather icon mapping based on WMO Weather interpretation codes
 */
export interface WeatherCodeInfo {
  description: string;
  icon: string;
  dayIcon?: string;
  nightIcon?: string;
}

export type WeatherIconType = '☀️' | '🌤️' | '⛅' | '☁️' | '🌧️' | '⛈️' | '🌨️' | '🌫️' | '❓';