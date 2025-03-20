import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Manage.module.css';
import { createQuestion, fetchCategories } from '../lib/api';
import toast from 'react-hot-toast';

/**
 * Manage page component renders a form for creating a new question.
 * @param {{ categories: Array<{id: number|string, name: string}> }} props
 * @returns {JSX.Element}
 */
export default function Manage({ categories }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    answers: Array.from({ length: 4 }, () => ({ text: '', correct: false })),
  });

  /**
   * Handles changes on input/select fields.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Updates a single answer object in the formData.answers array.
   * @param {number} index
   * @param {string} field
   * @param {string|boolean} value
   */
  const handleAnswerChange = (index, field, value) => {
    const answers = [...formData.answers];
    answers[index] = { ...answers[index], [field]: value };
    setFormData(prev => ({ ...prev, answers }));
  };

  /**
   * Submits new question to API.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      text: formData.title,
      description: formData.description,
      categoryId: Number(formData.categoryId),
      answers: formData.answers,
    };

    try {
      await createQuestion(payload);
      toast.success('Spurning bætt við!');
      // Reset form and reinitialize with 4 empty answer options.
      setFormData({ 
        title: '', 
        description: '', 
        categoryId: '', 
        answers: Array.from({ length: 4 }, () => ({ text: '', correct: false })),
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Layout title="Bæta við spurningu">
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Búa til spurningu</h2>
        <label>Spurning:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label>Flokkur:</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Veldu flokk</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <div className={styles.answersWrapper}>
          <h3>Svarmöguleikar</h3>
          {formData.answers.map((answer, i) => (
            <div key={i} className={styles.answerRow}>
              <input
                type="text"
                placeholder="Svar"
                value={answer.text}
                onChange={e => handleAnswerChange(i, 'text', e.target.value)}
                required
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={answer.correct}
                  onChange={e => handleAnswerChange(i, 'correct', e.target.checked)}
                /> Rétt
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className={styles.submitButton}>Búa til spurningu</button>
      </form>
    </Layout>
  );
}

/**
 * Fetches categories server‑side for Manage page.
 * @returns {Promise<{props: {categories: Array}}>}
 */
export async function getServerSideProps() {
  try {
    const categories = await fetchCategories();
    return { props: { categories } };
  } catch {
    return { props: { categories: [] } };
  }
}
