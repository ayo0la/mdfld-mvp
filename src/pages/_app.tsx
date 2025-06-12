import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      {!isHomePage && <Header />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 