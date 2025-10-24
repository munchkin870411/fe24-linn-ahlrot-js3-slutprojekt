import React from 'react';
import { notFound } from 'next/navigation';
import CountryDetails from '@/components/CountryDetails';
import CountryGallery from '@/components/CountryGallery';
import WeatherDisplay from '@/components/WeatherDisplay';
import { getCountryData } from '@/lib/services/countryService';
import { CountryPageProps } from '@/types/pages';
import styles from './page.module.css';

const CountryPage = async ({ params }: CountryPageProps) => {
  const { slug } = await params;
  const countryCode = slug.toUpperCase();

  // Fetch country data from server-side service
  const countryData = await getCountryData(countryCode);
  
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
            <CountryGallery 
              countryName={countryData.country.name.common}
              photos={countryData.photos} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryPage;