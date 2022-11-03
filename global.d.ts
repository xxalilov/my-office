namespace NodeJS {
  interface ProcessEnv {
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
}
