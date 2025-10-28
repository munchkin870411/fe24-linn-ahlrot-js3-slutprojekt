'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { RegionFilterProps } from '@/types/props';
import { Region } from '@/types/types';
import styles from './RegionFilter.module.css';

const REGIONS: Region[] = [
  { value: '', label: 'All Regions' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Antarctic', label: 'Antarctic' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];

export default function RegionFilter({ 
  onRegionChange, 
  className = "" 
}: RegionFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentRegion = searchParams.get('region') || '';

  const handleRegionClick = (regionValue: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (regionValue) {
      params.set('region', regionValue);
    } else {
      params.delete('region');
    }
    
    // Reset to page 1 when changing region
    params.set('page', '1');
    
    router.replace(`?${params.toString()}`, { scroll: false });
    onRegionChange?.(regionValue);
  };

  return (
    <div className={`${styles.regionFilter} ${className}`} aria-label="Region filter" role="region">
      <h3 className={styles.filterTitle} id="region-filter-title">Filter by Region:</h3>
      <div className={styles.filterButtons} role="group" aria-labelledby="region-filter-title">
        {REGIONS.map((region) => (
          <button
            key={region.value}
            onClick={() => handleRegionClick(region.value)}
            className={`${styles.filterButton} ${
              currentRegion === region.value ? styles.active : ''
            }`}
            aria-pressed={currentRegion === region.value}
            aria-label={region.label === 'All Regions' ? 'Show all regions' : `Filter by ${region.label}`}
            type="button"
          >
            {region.label}
          </button>
        ))}
      </div>
    </div>
  );
}