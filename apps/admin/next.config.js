/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "standalone",
  experimental:
  {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    serverComponentsExternalPackages: ["@nestjs", "@nestjs/core","express","replicate","@node-rs/argon2", "@node-rs/bcrypt"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@repo/ui",
    "@repo/api",
    "@repo/auth",
    "@repo/business-config",
    "@repo/database",
    "@repo/lib",
    "@repo/next-lib",
    "dotenv",
    "dotenv-cli",
  ],
  webpack: (config, { dev }) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true }
};

module.exports = nextConfig;
