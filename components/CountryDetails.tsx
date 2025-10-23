'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CountryDetailsComponentProps } from '@/types/props';
import LoadingSpinner from './LoadingSpinner';
import styles from './CountryDetails.module.css';

export default function CountryDetails({ country, wikipediaData }: CountryDetailsComponentProps) {
  const wikipediaLoading = false; // Data comes from props now
  const wikipediaError = false;  // No error state needed

  // Fallback loading state if no country data
  if (!country) {
    return (
      <LoadingSpinner 
        message="Laddar landsinformation..." 
        size="large"
      />
    );
  }

  const formatNumber = (num?: number) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('sv-SE').format(num);
  };

  const formatLanguages = (languages?: Record<string, string>) => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };

  const formatCurrencies = (currencies?: Record<string, { name: string; symbol?: string }>) => {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name}${currency.symbol ? ` (${currency.symbol})` : ''}`)
      .join(', ');
  };

  return (
    <div className={styles.countryDetails}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Tillbaka till länder
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.flagSection}>
          <Image
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width={300}
            height={200}
            className={styles.flag}
            priority
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.countryName}>{country.name.common}</h1>
          {country.name.official !== country.name.common && (
            <p className={styles.officialName}>Official name: {country.name.official}</p>
          )}

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Region:</span>
              <span className={styles.value}>{country.region}</span>
            </div>

            {country.subregion && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Subregion:</span>
                <span className={styles.value}>{country.subregion}</span>
              </div>
            )}

            <div className={styles.infoItem}>
              <span className={styles.label}>Capital:</span>
              <span className={styles.value}>
                {country.capital ? country.capital.join(', ') : 'N/A'}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Population:</span>
              <span className={styles.value}>{formatNumber(country.population)}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Area:</span>
              <span className={styles.value}>
                {country.area ? `${formatNumber(country.area)} km²` : 'N/A'}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Languages:</span>
              <span className={styles.value}>{formatLanguages(country.languages)}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Currencies:</span>
              <span className={styles.value}>{formatCurrencies(country.currencies)}</span>
            </div>

            {country.timezones && country.timezones.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Timezones:</span>
                <span className={styles.value}>{country.timezones.join(', ')}</span>
              </div>
            )}

            <div className={styles.infoItem}>
              <span className={styles.label}>Country code:</span>
              <span className={styles.value}>{country.cca2} / {country.cca3}</span>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Borders:</span>
                <span className={styles.value}>{country.borders.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wikipedia Section */}
      <div className={styles.wikipediaSection}>
        
        {wikipediaLoading ? (
          <div className={styles.loadingState}>
            <LoadingSpinner 
              message="Loading information from Wikipedia..." 
              size="medium"
            />
          </div>
        ) : wikipediaError ? (
          <div className={styles.noWikipediaData}>
            <p>No additional information available from Wikipedia.</p>
          </div>
        ) : wikipediaData ? (
          <div className={styles.wikipediaContent}>
            <div className={styles.wikipediaText}>
              {wikipediaData.description && (
                <p className={styles.wikipediaDescription}>
                  <strong>{wikipediaData.description}</strong>
                </p>
              )}
              
              {wikipediaData.extract && (
                <div className={styles.wikipediaExtract}>
                  <p>{wikipediaData.extract}</p>
                </div>
              )}
              
              <div className={styles.wikipediaLink}>
                <a 
                  href={wikipediaData.content_urls.desktop.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readMoreLink}
                >
                  Read more on Wikipedia →
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.noWikipediaData}>
            <p>No additional information available from Wikipedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}