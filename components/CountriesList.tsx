'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../lib/services/countriesService';
import styles from './CountriesList.module.css';

const CountriesList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const search = searchParams.get('search') || undefined;
  const region = searchParams.get('region') || undefined;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['countries', { page, pageSize, search, region }],
    queryFn: () => fetchCountries({ page, pageSize, search, region }),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  const handlePrevious = () => {
    if (page > 1) {
      navigateToPage(page - 1);
    }
  };

  const handleNext = () => {
    if (data && page < data.totalPages) {
      navigateToPage(page + 1);
    }
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading countries...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error loading countries: {error?.message}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!data || !data.countries.length) {
    const isSearching = search && search.trim().length > 0;
    return (
      <div className={styles.noResults}>
        {isSearching ? (
          <p>No countries found for &ldquo;{search}&rdquo;.</p>
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.countriesList}>
      <div className={styles.countriesGrid}>
        {data.countries.map((country) => (
          <div key={country.cca3} className={styles.countryCard}>
            <Image 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              width={50} 
              height={32} 
              className={styles.countryFlag}
            />
            <div className={styles.countryContent}>
              <h3 className={styles.countryName}>{country.name.common}</h3>
              <p className={styles.countryInfo}>Region: {country.region}</p>
              {country.capital && (
                <p className={styles.countryInfo}>Capital: {country.capital.join(', ')}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          <p>
            Sida {data.page} av {data.totalPages} ({data.total} länder totalt)
          </p>
        </div>
        
        <div className={styles.paginationButtons}>
          <button 
            onClick={handlePrevious}
            disabled={page <= 1}
            className={styles.paginationBtn}
          >
            ← Föregående
          </button>
          
          <span className={styles.pageIndicator}>
            {data.page} / {data.totalPages}
          </span>
          
          <button 
            onClick={handleNext}
            disabled={page >= data.totalPages}
            className={styles.paginationBtn}
          >
            Nästa →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountriesList;