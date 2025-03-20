import { useState } from 'react';
import styles from '../styles/CategoryForm.module.css';

/**
 * CategoryForm component renders a form for creating or editing a category.
 * @param {Object} props
 * @param {(data: Object) => void} props.onSubmit - Callback invoked with form data on submit.
 * @param {Object} [props.initialData={}] - Initial values for the form fields.
 * @returns {JSX.Element} The rendered category form.
 */
export default function CategoryForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '' });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        {initialData.title ? 'Breyta flokki' : 'Búa til nýjan flokk'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="title" className={styles.label}>Flokksheiti</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Sláðu inn flokk"
            value={formData.title || ''}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Staðfesta
        </button>
      </form>
    </div>
  );
}