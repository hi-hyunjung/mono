import { fileURLToPath } from 'url';
import { createJiti } from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./src/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'production',
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
};

export default nextConfig;
