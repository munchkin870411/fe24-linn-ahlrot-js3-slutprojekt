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
      <div className={`${styles.weatherCard} ${styles.error} ${className || ''}`}>
        <div className={styles.errorIcon}>🌦️</div>
        <p>Weather data not available</p>
        <small>Could not retrieve weather data for this location</small>
      </div>
    );
  }

  const { current, location } = weather;
  const weatherIcon = getWeatherIcon(current.weatherCode, current.isDay);

  return (
    <div className={`${styles.weatherCard} ${className || ''}`}>
      <div className={styles.weatherHeader}>
        <h3 className={styles.weatherTitle}>
          Weather in {location.city}
        </h3>
      </div>

      <div className={styles.weatherMain}>
        <div className={styles.weatherIcon}>
          {weatherIcon}
        </div>
        <div className={styles.temperature}>
          {current.temperature}°C
        </div>
        <div className={styles.description}>
          {current.weatherDescription}
        </div>
      </div>

      <div className={styles.weatherDetails}>
        <div className={styles.weatherDetail}>
          <span className={styles.detailIcon}>💨</span>
          <span className={styles.detailLabel}>Wind:</span>
          <span className={styles.detailValue}>{current.windSpeed} km/h</span>
        </div>
        
        <div className={styles.weatherDetail}>
          <span className={styles.detailIcon}>💧</span>
          <span className={styles.detailLabel}>Humidity:</span>
          <span className={styles.detailValue}>{current.humidity}%</span>
        </div>
        
        <div className={styles.weatherDetail}>
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