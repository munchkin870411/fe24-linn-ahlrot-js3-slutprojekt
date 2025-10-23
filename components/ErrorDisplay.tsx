import React from 'react';
import { ErrorDisplayProps } from '@/types/props';
import styles from './ErrorDisplay.module.css';

export default function ErrorDisplay({ 
  error, 
  isNotFound = false, 
  countryCode,
  onRetry,
  onGoBack,
  className 
}: ErrorDisplayProps) {
  return (
    <div className={`${styles.errorContainer} ${className || ''}`}>
      <h1 className={styles.errorTitle}>
        {isNotFound ? 'Country not found' : 'Error loading'}
      </h1>
      <p className={styles.errorDescription}>
        {isNotFound 
          ? `The country with code "${countryCode}" could not be found.`
          : 'Could not load country information.'
        }
      </p>
      {!isNotFound && error && (
        <details className={styles.errorDetails}>
          <summary className={styles.errorSummary}>
            Show technical information
          </summary>
          <pre className={styles.errorPre}>
            {error.message || 'Unknown error'}
          </pre>
        </details>
      )}
      <div className={styles.errorActions}>
        {onRetry && (
          <button 
            onClick={onRetry}
            className={styles.retryButton}
          >
            Try again
          </button>
        )}
        {onGoBack && (
          <button 
            onClick={onGoBack}
            className={styles.backButton}
          >
            Go back
          </button>
        )}
      </div>
    </div>
  );
}