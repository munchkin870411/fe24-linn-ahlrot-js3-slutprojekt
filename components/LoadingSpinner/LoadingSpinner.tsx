import React from 'react';
import { LoadingSpinnerProps } from '@/types/props';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ 
  message = "Laddar...", 
  className,
  size = 'medium',
  fullScreen = false
}: LoadingSpinnerProps) {
  const containerClass = fullScreen 
    ? `${styles.fullScreenContainer} ${className || ''}` 
    : `${styles.loadingContainer} ${className || ''}`;

  const spinnerClass = `${styles.loadingSpinner} ${styles[size]}`;

  return (
    <div className={containerClass}>
      <div className={spinnerClass} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}