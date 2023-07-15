/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_TOKEN: process.env.REACT_APP_TOKEN,
  },

  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
