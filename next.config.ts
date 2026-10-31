import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_PAGES === "true";
const isProjectSite = Boolean(repository && !repository.endsWith(".github.io"));
const basePath = isGithubPagesBuild && isProjectSite ? `/${repository}` : "";

const nextConfig: NextConfig = {
  output: isGithubPagesBuild ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
