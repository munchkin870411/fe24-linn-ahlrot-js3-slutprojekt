import React from 'react';
import { notFound } from 'next/navigation';
import CountryDetails from '@/components/CountryDetails';
import WeatherDisplay from '@/components/WeatherDisplay';
import { fetchCountryServerSide } from '@/lib/services/countryServerService';
import { CountryPageProps } from '@/types/pages';
import styles from './page.module.css';

const CountryPage = async ({ params }: CountryPageProps) => {
  const { slug } = await params;
  const countryCode = slug.toUpperCase();

  // Server-side data fetching - nu inkluderar weather data
  const countryData = await fetchCountryServerSide(countryCode);
  
  if (!countryData) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.contentGrid}>
          <div className={styles.countrySection}>
            <CountryDetails 
              country={countryData.country} 
              wikipediaData={countryData.wikipedia}
            />
          </div>
          
          <div className={styles.weatherSection}>
            <WeatherDisplay weather={countryData.weather} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryPage;