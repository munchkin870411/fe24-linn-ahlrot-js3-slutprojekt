'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../lib/services/countriesService';

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
    return (
      <div>
        <p>No countries found.</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {data.countries.map((country) => (
          <li key={country.cca3}>
            <Image 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              width={50} 
              height={30} 
            />
            <p>{country.name.common}</p>
            <p>Region: {country.region}</p>
            {country.capital && <p>Capital: {country.capital.join(', ')}</p>}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <div className="pagination-info">
          <p>
            Sida {data.page} av {data.totalPages} ({data.total} länder totalt)
          </p>
        </div>
        
        <div className="pagination-buttons">
          <button 
            onClick={handlePrevious}
            disabled={page <= 1}
            className="pagination-btn"
          >
            ← Föregående
          </button>
          
          <span className="page-indicator">
            {data.page} / {data.totalPages}
          </span>
          
          <button 
            onClick={handleNext}
            disabled={page >= data.totalPages}
            className="pagination-btn"
          >
            Nästa →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountriesList;