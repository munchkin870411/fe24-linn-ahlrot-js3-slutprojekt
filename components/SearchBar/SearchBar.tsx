'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchSchema } from '@/types/types';
import { SearchBarProps } from '@/types/props';
import styles from './SearchBar.module.css';

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search countries...", 
  className = "" 
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError('');
    
    // Validate with Zod
    const result = searchSchema.safeParse({ query });
    
    if (!result.success) {
      const firstError = result.error.issues[0];
      setError(firstError.message);
      return;
    }
    
    // Use validated and cleaned data
    const validatedQuery = result.data.query || '';
    
    const params = new URLSearchParams(searchParams);
    
    if (validatedQuery) {
      params.set('search', validatedQuery);
    } else {
      params.delete('search');
    }
    
    // Reset to page 1 when searching
    params.set('page', '1');
    
    router.replace(`?${params.toString()}`, { scroll: false });
    onSearch?.(validatedQuery);
  };

  const handleClear = () => {
    setQuery('');
    setError('');
    
    // Reset everything to default state - remove all search params except pageSize
    const params = new URLSearchParams();
    const currentPageSize = searchParams.get('pageSize');
    if (currentPageSize && currentPageSize !== '7') {
      params.set('pageSize', currentPageSize);
    }
    params.set('page', '1');
    
    router.replace(`?${params.toString()}`, { scroll: false });
    onSearch?.('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
    
    // Real-time validation for length
    if (value.length > 50) {
      setError('Search query must be less than 50 characters');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchBar} ${className}`}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`${styles.searchInput} ${error ? styles.searchInputError : ''}`}
          aria-label="Search countries"
          aria-invalid={!!error}
          aria-describedby={error ? 'search-error' : undefined}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.searchClearBtn}
            aria-label="Clear search and reset filters"
            title="Clear search and reset to default"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className={styles.searchSubmitBtn}
          aria-label="Search"
        >
          🔍
        </button>
      </div>
      {error && (
        <div id="search-error" className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </form>
  );
}