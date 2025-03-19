// components/Spinner.js
import styles from '../styles/Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
}
