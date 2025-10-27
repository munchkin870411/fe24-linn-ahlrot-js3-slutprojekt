
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

import { auth } from '@/auth';
import { loginWithGoogle, logout } from '../authActions';

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
          <div className={styles.userBar}>
            <form action={logout} style={{ display: 'inline' }}>
              <button className={styles.loginButton} type="submit">Log out</button>
            </form>
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'Profilbild'}
                className={styles.profileImage}
                width={32}
                height={32}
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            )}
          </div>
        ) : (
          <form action={loginWithGoogle}>
            <button className={styles.loginButton} type="submit">Log in</button>
          </form>
        )}
      </div>
    </header>
  );
}