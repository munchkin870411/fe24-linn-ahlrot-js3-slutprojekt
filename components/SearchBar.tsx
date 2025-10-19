'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams);
    const trimmedQuery = query.trim();
    
    if (trimmedQuery) {
      params.set('search', trimmedQuery);
    } else {
      params.delete('search');
    }
    
    // Reset to page 1 when searching
    params.set('page', '1');
    
    router.replace(`?${params.toString()}`, { scroll: false });
    onSearch?.(trimmedQuery);
  };

  const handleClear = () => {
    setQuery('');
    
    // Reset everything to default state - remove all search params except pageSize
    const params = new URLSearchParams();
    const currentPageSize = searchParams.get('pageSize');
    if (currentPageSize && currentPageSize !== '10') {
      params.set('pageSize', currentPageSize);
    }
    params.set('page', '1');
    
    router.replace(`?${params.toString()}`, { scroll: false });
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchBar} ${className}`}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Search countries"
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
    </form>
  );
}