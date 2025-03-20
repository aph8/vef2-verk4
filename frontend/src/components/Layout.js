import Link from 'next/link';
import styles from '../styles/Layout.module.css';
import ScrollToTop from './ScrollToTop';

/**
 * Layout component sem inniheldur header, main og footer.
 * @param {Object} props - Props fyrir component.
 * @param {React.ReactNode} props.children - Efni síðunnar.
 * @param {string} props.title - Titill síðunnar.
 * @returns {JSX.Element} Layout component.
 */
export default function Layout({ children, title }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <h1 className={styles.logo}></h1>
          <ul className={styles.navLinks}>
            <li><Link href="/">Forsíða</Link></li>
            <li><Link href="/manage">Bæta við spurningu</Link></li>
            <li><Link href="/manage-categories">Bæta við flokk</Link></li>
            <li><Link href="/EditQuestion">Breyta Spurningu</Link></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <h2 className={styles.pageTitle}>{title}</h2>
        {children}
      </main>
      <ScrollToTop/>
      <footer className={styles.footer}>
        &copy; 2025 Vefforritun Verkefni
      </footer>
    </div>
  );
}
