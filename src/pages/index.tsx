import React from 'react';
import Head from 'next/head';

const Home: React.FC = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>mdfld-mvp</title>
    </Head>
    <main className="flex min-h-screen items-center justify-center bg-background text-primary font-gordita px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Welcome to mdfld-mvp!
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-accent">
          The C2C football marketplace, built for every device.
        </p>
      </div>
    </main>
  </>
);

export default Home; 