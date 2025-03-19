import Layout from '../components/Layout';
import styles from '../styles/Index.module.css';
import Link from 'next/link';
import { fetchCategories } from '../lib/api';

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

export async function getServerSideProps() {
  try {
    const categories = await fetchCategories();
    return { props: { categories } };
  } catch (err) {
    return { props: { categories: [] } };
  }
}
