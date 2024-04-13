/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/invoices',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
