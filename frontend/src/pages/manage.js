// pages/manage.js
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Manage.module.css';
import { createQuestion, fetchCategories } from '../lib/api';
import toast from 'react-hot-toast';

export default function Manage({ categories }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    answers: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const addAnswer = () => {
    setFormData({
      ...formData,
      answers: [...formData.answers, { text: '', correct: false }],
    });
  };

  const removeAnswer = (index) => {
    const updatedAnswers = formData.answers.filter((_, i) => i !== index);
    setFormData({ ...formData, answers: updatedAnswers });
  };

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
      setFormData({ title: '', description: '', categoryId: '', answers: [] });
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
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className={styles.answersWrapper}>
          <h3>Svarmöguleikar</h3>
          {formData.answers.map((answer, index) => (
            <div key={index} className={styles.answerRow}>
              <input
                type="text"
                placeholder="Svar"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                required
                className={styles.input}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={answer.correct}
                  onChange={(e) => handleAnswerChange(index, 'correct', e.target.checked)}
                />
                Rétt
              </label>
              <button type="button" onClick={() => removeAnswer(index)} className={styles.removeButton}>
                Eyða
              </button>
            </div>
          ))}
          <button type="button" onClick={addAnswer} className={styles.addButton}>
            Bæta við svarmöguleika
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>Búa til spurningu</button>
      </form>
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