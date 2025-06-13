const withTM = require('next-transpile-modules')([
  'aws-amplify',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/server/:path*',
        destination: 'http://localhost:4000/api/:path*', // Proxy to backend
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

module.exports = withTM(nextConfig); 