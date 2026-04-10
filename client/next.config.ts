import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://3.108.218.111:5000/api/:path*',
      },
    ]
  },
};

export default nextConfig;
