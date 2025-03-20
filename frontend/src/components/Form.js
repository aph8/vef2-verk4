import { useState } from 'react';
import Button from './Button';
import styles from '../styles/Form.module.css';

/**
 * Generic Form component for rendering input fields and handling submission.
 * @param {Object} props
 * @param {(data: Object) => void} props.onSubmit - Callback called with form data on submit.
 * @param {Object} [props.initialData={}] - Initial values for the form fields.
 * @param {Array<Object>} [props.fields] - Array of field definitions.
 * @returns {JSX.Element} The rendered form.
 */
const Form = ({ onSubmit, initialData = {}, fields }) => {
  const defaultFields = [
    { label: 'Titill:', name: 'title', type: 'text', placeholder: 'Sláðu inn titil' },
    { label: 'Lýsing:', name: 'description', type: 'text', placeholder: 'Sláðu inn lýsingu' },
  ];
  const formFields = fields || defaultFields;
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name} className={styles.formField}>
            <label htmlFor={field.name} className={styles.label}>
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder || ''}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        ))}
        <Button type="submit" className={styles.button}>
          Staðfesta
        </Button>
      </form>
    </div>
  );
};
export default Form;