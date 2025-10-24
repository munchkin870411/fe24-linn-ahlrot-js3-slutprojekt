import Link from 'next/link';
import styles from './Header.module.css';

import { auth } from '@/auth';
import { loginWithGoogle, logout } from './authActions';

export default async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>☀️</span>
          <span className={styles.logoText}>MunchkinTravelApp</span>
        </Link>

        {session ? (
          <form action={logout}>
            <button className={styles.loginButton} type="submit">Log out</button>
          </form>
        ) : (
          <form action={loginWithGoogle}>
            <button className={styles.loginButton} type="submit">Log in</button>
          </form>
        )}
      </div>
    </header>
  );
}