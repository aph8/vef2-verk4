import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CategoryForm from '../components/CategoryForm';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchQuestionsByCategory,
  deleteQuestion,
} from '../lib/api';
import styles from '../styles/ManageCategories.module.css';
import toast from 'react-hot-toast';

/**
 * ManageCategories page for creating, updating, and deleting categories.
 * Cascade deletion: deletes all questions under a category then deletes the category.
 * @returns {JSX.Element}
 */
export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  /** Loads categories from API */
  async function loadCategories() {
    try {
      setCategories(await fetchCategories());
    } catch (err) {
      toast.error(err.message);
    }
  }

  /**
   * Handles creating a new category.
   * @param {{ title: string }} formData
   */
  async function handleCreateCategory(formData) {
    try {
      await createCategory({ name: formData.title });
      toast.success('Flokkur bættur við!');
      loadCategories();
    } catch (err) {
      toast.error(err.message);
    }
  }

  /**
   * Handles updating an existing category.
   * @param {{ title: string }} formData
   */
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

  /**
   * Deletes all questions under a category and then deletes the category.
   * @param {string} slug - The slug of the category to delete.
   */
  async function handleDeleteCategory(slug) {
    if (
      !window.confirm(
        'Ertu viss um að eyða þessum flokki og öllum tengdum spurningum?'
      )
    )
      return;
    try {
      // Fetch questions under this category.
      const questionsResponse = await fetchQuestionsByCategory(slug);
      // Expecting a "data" property containing an array of questions.
      const questions = questionsResponse.data || [];
      // Delete all questions concurrently.
      await Promise.all(questions.map((q) => deleteQuestion(q.id)));
      // Now delete the category.
      await deleteCategory(slug);
      toast.success('Flokkur og tengdar spurningar eyddar!');
      setEditCategory(null);
      loadCategories();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Layout title="Stjórnun Flokka">
      <section className={styles.formSection}>
        {editCategory ? (
          <CategoryForm
            onSubmit={handleUpdateCategory}
            initialData={{ title: editCategory.name }}
          />
        ) : (
          <CategoryForm onSubmit={handleCreateCategory} />
        )}
      </section>

      <section className={styles.categoriesSection}>
        <h3>Flokkar:</h3>
        <ul className={styles.categoryList}>
          {categories.map((cat) => (
            <li key={cat.id} className={styles.categoryItem}>
              <span>
                {cat.name} ({cat.slug})
              </span>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => setEditCategory({ ...cat, name: '' })}
                  className={styles.editButton}
                >
                  Breyta
                </button>
                <button
                  onClick={() => {
                    setEditCategory(null);
                    handleDeleteCategory(cat.slug);
                  }}
                  className={styles.deleteButton}
                >
                  Eyða
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}