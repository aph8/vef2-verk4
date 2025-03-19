// pages/manage-categories.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CategoryForm from '../components/CategoryForm';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../lib/api';
import styles from '../styles/ManageCategories.module.css';
import toast from 'react-hot-toast';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleCreateCategory(formData) {
    try {
      await createCategory({ name: formData.title });
      toast.success('Flokkur bættur við!');
      loadCategories();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleUpdateCategory(formData) {
    try {
      await updateCategory(editCategory.slug, { name: formData.title });
      toast.success('Flokkur uppfærður!');
      setEditCategory(null);
      loadCategories();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDeleteCategory(slug) {
    if (!window.confirm('Ertu viss um að eyða þessum flokki?')) return;
    try {
      await deleteCategory(slug);
      toast.success('Flokkur eyddur!');
      loadCategories();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Layout title="Stjórnun Flokka">
      {editCategory ? (
        <CategoryForm onSubmit={handleUpdateCategory} initialData={{ title: editCategory.name }} />
      ) : (
        <CategoryForm onSubmit={handleCreateCategory} />
      )}

      <h3>Flokkar:</h3>
      <ul className={styles.categoryList}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.categoryItem}>
            <span>{cat.name} ({cat.slug})</span>
            <div className={styles.buttonGroup}>
              <button onClick={() => setEditCategory(cat)} className={styles.editButton}>Breyta</button>
              <button onClick={() => handleDeleteCategory(cat.slug)} className={styles.deleteButton}>Eyða</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}