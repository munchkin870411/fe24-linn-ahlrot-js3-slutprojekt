import React from 'react';
import { WeatherDisplayProps } from '@/types/props';
import { getWeatherIcon } from '@/lib/services/weatherService';
import styles from './WeatherDisplay.module.css';

export default function WeatherDisplay({ 
  weather,
  className 
}: WeatherDisplayProps) {
  if (!weather) {
    return (
      <div className={`${styles.weatherCard} ${styles.error} ${className || ''}`} aria-label="Weather data unavailable" role="region">
        <div className={styles.errorIcon}>🌦️</div>
        <p>Weather data not available</p>
        <small>Could not retrieve weather data for this location</small>
      </div>
    );
  }

  const { current, location } = weather;
  const weatherIcon = getWeatherIcon(current.weatherCode, current.isDay);

  return (
    <div className={`${styles.weatherCard} ${className || ''}`} aria-label={`Current weather in ${location.city}`} role="region">
      <div className={styles.weatherHeader}>
        <h3 className={styles.weatherTitle} id="weather-title">
          Weather in {location.city}
        </h3>
      </div>

      <div className={styles.weatherMain} aria-labelledby="weather-title">
        <div className={styles.weatherIcon} aria-label={current.weatherDescription}>
          {weatherIcon}
        </div>
        <div className={styles.temperature} aria-label="Temperature">
          {current.temperature}°C
        </div>
        <div className={styles.description} aria-label="Weather description">
          {current.weatherDescription}
        </div>
      </div>

      <div className={styles.weatherDetails} role="list" aria-label="Weather details">
        <div className={styles.weatherDetail} role="listitem">
          <span className={styles.detailIcon}>💨</span>
          <span className={styles.detailLabel}>Wind:</span>
          <span className={styles.detailValue}>{current.windSpeed} km/h</span>
        </div>
        
        <div className={styles.weatherDetail} role="listitem">
          <span className={styles.detailIcon}>💧</span>
          <span className={styles.detailLabel}>Humidity:</span>
          <span className={styles.detailValue}>{current.humidity}%</span>
        </div>
        
        <div className={styles.weatherDetail} role="listitem">
          <span className={styles.detailIcon}>{current.isDay ? '☀️' : '🌙'}</span>
          <span className={styles.detailLabel}>Time:</span>
          <span className={styles.detailValue}>
            {new Date(current.time).toLocaleTimeString('sv-SE', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className={styles.weatherFooter}>
        <small>Data from Open-Meteo</small>
      </div>
    </div>
  );
}