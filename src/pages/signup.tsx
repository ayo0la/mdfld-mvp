import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignUp: React.FC = () => (
  <>
    <Head>
      <title>Sign Up</title>
    </Head>
    <div className="min-h-screen bg-dark-2 text-white font-gordita">
      <Header />
      <main className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Sign Up Page</h1>
        <p className="text-lg text-gray-400">Create a new account.</p>
      </main>
      <Footer />
    </div>
  </>
);

export default SignUp; 