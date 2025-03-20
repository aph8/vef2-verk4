import styles from '../styles/Spinner.module.css';
/**
 * Spinner component displays a loading overlay with a spinner animation.
 * @returns {JSX.Element} The loading spinner overlay.
 */
export default function Spinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
}