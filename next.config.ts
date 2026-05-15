import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: isGithubPages,
  },
  trailingSlash: true,
  ...(isGithubPages ? { output: "export" as const } : {}),
  basePath: isGithubPages ? basePath : undefined,
  assetPrefix: isGithubPages ? basePath : undefined,
};

export default nextConfig;
