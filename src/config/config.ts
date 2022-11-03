import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: string | undefined;
  MONGO_URI: string | undefined;
  ADMIN_EMAIL: string | undefined;
  ADMIN_PASSWORD: string | undefined;
  JWT_SECRET: string | undefined;
  JWT_EXPIRE: string | undefined;
  JWT_COOKIE_EXPIRE: string | undefined;
  GMAIL: string | undefined;
  GMAIL_PASSWORD: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: string;
  MONGO_URI: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  JWT_COOKIE_EXPIRE: string;
  GMAIL: string;
  GMAIL_PASSWORD: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
    GMAIL: process.env.GMAIL,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
