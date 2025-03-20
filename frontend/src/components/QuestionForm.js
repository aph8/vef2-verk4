import { useState } from 'react';
import styles from '../styles/QuestionForm.module.css';

/**
 * QuestionForm component renders a form to create a question.
 * @param {Object} props
 * @param {(data: Object) => void} props.onSubmit - Callback called with question data on submit.
 * @param {Object} [props.initialData={}] - Initial values for the form.
 * @returns {JSX.Element} The question form.
 */
export default function QuestionForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Búa til spurningu</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="title" className={styles.label}>Spurning</label>
          <input id="title" name="title" type="text" placeholder="Sláðu inn spurningu" value={formData.title || ''} onChange={handleChange} className={styles.input} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="description" className={styles.label}>Lýsing</label>
          <input id="description" name="description" type="text" placeholder="Sláðu inn lýsingu (ef þarf)" value={formData.description || ''} onChange={handleChange} className={styles.input} />
        </div>
        <button type="submit" className={styles.button}>Staðfesta</button>
      </form>
    </div>
  );
}