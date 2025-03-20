import { useState, useEffect } from 'react';
import styles from '../styles/ScrollToTop.module.css';
import { ArrowUp } from 'lucide-react';
/**
 * ScrollToTop component shows a button to scroll the page to top when user scrolls down.
 * @returns {JSX.Element|null} Scroll-to-top button if visible, else null.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 200);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!isVisible) return null;
  return (<button className={styles.scrollButton} onClick={scrollToTop}><ArrowUp size={24} /></button>);
}