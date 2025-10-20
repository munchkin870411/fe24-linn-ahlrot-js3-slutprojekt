import React from 'react';
import { notFound } from 'next/navigation';
import CountryDetails from '@/components/CountryDetails';
import { fetchCountryServerSide } from '@/lib/services/countryServerService';
import { CountryPageProps } from '@/types/pages';
import styles from './page.module.css';

const CountryPage = async ({ params }: CountryPageProps) => {
  const { slug } = await params;
  const countryCode = slug.toUpperCase();

  // Server-side data fetching (som din homepage)
  const countryData = await fetchCountryServerSide(countryCode);
  
  if (!countryData) {
    notFound(); // Next.js built-in 404
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CountryDetails 
          country={countryData.country} 
          wikipediaData={countryData.wikipedia} 
        />
      </main>
    </div>
  );
};

export default CountryPage;