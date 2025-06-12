import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopPageContent from '../components/ShopPageContent';

const Shop: React.FC = () => (
  <>
    <Head>
      <title>Shop</title>
    </Head>
    <div className="min-h-screen bg-dark-2 text-white font-gordita">
      <Header />
      <ShopPageContent />
      <Footer />
    </div>
  </>
);

export default Shop; 