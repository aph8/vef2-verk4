import Layout from '../components/Layout';
import Link from 'next/link';
import styles from '../styles/Index.module.css';
import { fetchCategories } from '../lib/api';

/**
 * Home page component displaying all categories.
 * @param {{categories: Array<{id: string|number, name: string, slug: string}>}} props
 * @returns {JSX.Element}
 */
export default function Home({ categories }) {
  return (
    <Layout title="Veldu flokk">
    <div className={styles.grid}>
      {categories.map((cat) => (
        <Link href={`/category/${cat.slug}`} key={cat.id} className={styles.card}>
          <h3>{cat.name}</h3>
          <p>Skoða spurningar í þessum flokki</p>
        </Link>
      ))}
    </div>
  </Layout>
);
}

/**
 * Fetches categories server-side for the home page.
 * @returns {Promise<{props: {categories: Array}}>} 
 */
export async function getServerSideProps() {
  try { const categories = await fetchCategories(); 
    return { props: { categories } }; 
  } catch { 
    return { props: { categories: [] } }; }
}