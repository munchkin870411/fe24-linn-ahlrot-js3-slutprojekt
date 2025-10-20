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
        {isNotFound ? 'Land hittades inte' : 'Fel vid laddning'}
      </h1>
      <p className={styles.errorDescription}>
        {isNotFound 
          ? `Landet med kod "${countryCode}" kunde inte hittas.`
          : 'Kunde inte ladda landsinformation.'
        }
      </p>
      {!isNotFound && error && (
        <details className={styles.errorDetails}>
          <summary className={styles.errorSummary}>
            Visa teknisk information
          </summary>
          <pre className={styles.errorPre}>
            {error.message || 'Okänt fel'}
          </pre>
        </details>
      )}
      <div className={styles.errorActions}>
        {onRetry && (
          <button 
            onClick={onRetry}
            className={styles.retryButton}
          >
            Försök igen
          </button>
        )}
        {onGoBack && (
          <button 
            onClick={onGoBack}
            className={styles.backButton}
          >
            Gå tillbaka
          </button>
        )}
      </div>
    </div>
  );
}