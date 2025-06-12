import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Account: React.FC = () => (
  <>
    <Head>
      <title>Account Dashboard</title>
    </Head>
    <div className="min-h-screen bg-dark-2 text-white font-gordita">
      <Header />
      <main className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Account Dashboard</h1>
        <p className="text-lg text-gray-400">Manage your account details here.</p>
      </main>
      <Footer />
    </div>
  </>
);

export default Account; 