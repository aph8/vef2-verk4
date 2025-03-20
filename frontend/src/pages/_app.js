// pages/_app.js
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import '../styles/globals.css';

/**
 * Custom App component for Next.js with global layout, animations, and loading spinner.
 * @param {{Component: React.ComponentType, pageProps: object, router: import('next/router').NextRouter}} props
 * @returns {JSX.Element}
 */
function MyApp({ Component, pageProps, router }) {
  const nextRouter = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    nextRouter.events.on('routeChangeStart', handleStart);
    nextRouter.events.on('routeChangeComplete', handleComplete);
    nextRouter.events.on('routeChangeError', handleComplete);

    return () => {
      nextRouter.events.off('routeChangeStart', handleStart);
      nextRouter.events.off('routeChangeComplete', handleComplete);
      nextRouter.events.off('routeChangeError', handleComplete);
    };
  }, [nextRouter]);

  return (
    <>
      {loading && <Spinner />}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '8px', background: '#333', color: '#fff' },
          success: { style: { background: '#0070f3' } },
          error: { style: { background: '#e53e3e' } },
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp;