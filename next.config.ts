import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{
      source:'/api/:path*',
      destination:'https://mock.apifox.cn/m1/2398938-0-default/api/:path*'
    }]
  }
};

export default nextConfig;
