import { WeatherData, OpenMeteoResponse, WeatherIconType, weatherSchema } from '@/types/types';
import { getWeatherInfo } from '@/lib/data/weatherCodes';

/**
 * Get weather icon based on weather code and time of day
 */
function getWeatherIcon(weatherCode: number, isDay: boolean): WeatherIconType {
  const weatherInfo = getWeatherInfo(weatherCode);
  
  if (!weatherInfo) {
    return '❓';
  }
  
  // Use day/night specific icons if available
  if (weatherInfo.dayIcon && weatherInfo.nightIcon) {
    return (isDay ? weatherInfo.dayIcon : weatherInfo.nightIcon) as WeatherIconType;
  }
  
  return weatherInfo.icon as WeatherIconType;
}

/**
 * Get weather description based on weather code
 */
function getWeatherDescription(weatherCode: number): string {
  const weatherInfo = getWeatherInfo(weatherCode);
  return weatherInfo?.description || 'Okänt väder';
}

/**
 * Fetch weather data for a specific location using Open-Meteo API
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @param cityName - City name for display
 * @param countryName - Country name for display
 * @returns Promise with weather data
 */
export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  cityName: string,
  countryName: string
): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&timezone=auto`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 600 } // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data: OpenMeteoResponse = await response.json();

    // Transform API response to our interface
    const weatherData: WeatherData = {
      current: {
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        weatherDescription: getWeatherDescription(data.current.weather_code),
        windSpeed: Math.round(data.current.wind_speed_10m),
        humidity: data.current.relative_humidity_2m,
        isDay: data.current.is_day === 1,
        time: data.current.time,
      },
      location: {
        city: cityName,
        country: countryName,
        latitude,
        longitude,
      }
    };

    // Validate with Zod schema
    const result = weatherSchema.safeParse(weatherData);
    
    if (!result.success) {
      console.warn('Invalid weather data:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

/**
 * Fetch weather data for a country's capital
 * @param capitalName - Name of the capital city
 * @param countryName - Name of the country
 * @param coordinates - [latitude, longitude] array
 * @returns Promise with weather data
 */
export async function fetchWeatherForCountry(
  capitalName: string | string[],
  countryName: string,
  coordinates?: [number, number]
): Promise<WeatherData | null> {
  try {
    // Handle multiple capital cities - use the first one
    const cityName = Array.isArray(capitalName) ? capitalName[0] : capitalName;
    
    if (!cityName) {
      console.warn(`No capital city found for ${countryName}`);
      return null;
    }

    // Use provided coordinates or default to approximate location
    let lat: number, lon: number;
    
    if (coordinates && coordinates.length === 2) {
      [lat, lon] = coordinates;
    } else {
      // Fallback: Try to get coordinates for major cities
      console.warn(`No coordinates provided for ${cityName}, ${countryName}`);
      return null;
    }

    return await fetchWeatherData(lat, lon, cityName, countryName);
  } catch (error) {
    console.error(`Error fetching weather for ${capitalName}, ${countryName}:`, error);
    return null;
  }
}

/**
 * Export weather icon helper for components
 */
export { getWeatherIcon, getWeatherDescription };