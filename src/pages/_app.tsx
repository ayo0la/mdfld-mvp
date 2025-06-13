import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import '../lib/amplify';
import { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <AuthProvider>
      {!isHomePage && <Header />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp; 