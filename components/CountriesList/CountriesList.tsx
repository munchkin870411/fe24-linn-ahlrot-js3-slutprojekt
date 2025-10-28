'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../../lib/services/countryDataService';
import Pagination from '../Pagination/Pagination';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './CountriesList.module.css';
import ErrorRetry from '../ErrorRetry';

const CountriesList: React.FC = () => {
  const searchParams = useSearchParams();
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '7', 10);
  const search = searchParams.get('search') || undefined;
  const region = searchParams.get('region') || undefined;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['countries', { page, pageSize, search, region }],
    queryFn: () => fetchCountries({ page, pageSize, search, region }),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  if (isLoading) {
    return (
      <LoadingSpinner 
        message="Loading countries..." 
        size="large" 
      />
    );
  }

  if (isError) {
    return (
      <ErrorRetry message="Could not load country data. Please try again." />
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
    <div className={styles.countriesList} aria-label="Countries list" role="region">
      <div className={styles.countriesGrid} role="list" aria-label="Countries grid">
        {data.countries.map((country) => (
          <Link 
            key={country.cca3} 
            href={`/country/${country.cca3.toLowerCase()}`}
            className={styles.countryCardLink}
            aria-label={`View details for ${country.name.common}`}
          >
            <div className={styles.countryCard} role="listitem" aria-label={`${country.name.common} card`}>
              <Image 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
                width={50} 
                height={32} 
                className={styles.countryFlag}
                aria-label={`Flag of ${country.name.common}`}
              />
              <div className={styles.countryContent}>
                <h3 className={styles.countryName}>{country.name.common}</h3>
                <p className={styles.countryInfo}>Region: {country.region}</p>
                {country.capital && (
                  <p className={styles.countryInfo}>Capital: {country.capital.join(', ')}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={data.page}
        totalPages={data.totalPages}
        totalItems={data.total}
      />
    </div>
  );
};

export default CountriesList;