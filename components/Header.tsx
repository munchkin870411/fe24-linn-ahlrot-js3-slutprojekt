import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>☀️</span>
          <span className={styles.logoText}>MunchkinTravelApp</span>
        </Link>

        <Link href="/auth/signin" className={styles.loginButton}>
          Logga in
        </Link>
      </div>
    </header>
  );
}