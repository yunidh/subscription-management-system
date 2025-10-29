import { config } from "dotenv";

// Load environment-specific .env file, default to development
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV } = process.env;
