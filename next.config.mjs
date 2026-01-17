import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env.local");

if (fs.existsSync(envPath)) {
  const envLines = fs
    .readFileSync(envPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  for (const line of envLines) {
    const [key, ...valueParts] = line.split("=");
    const value = valueParts.join("=").trim();
    if (!process.env[key] && value) {
      process.env[key] = value;
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
