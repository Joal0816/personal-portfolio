import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const requiredEnvVars = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_ANON_KEY",
  "JWT_SECRET",
];

const optionalEnvVars = {
  NODE_ENV: "development",
  PORT: "5000",
  JWT_EXPIRE: "30d",
  CORS_ORIGIN: "*",
};

export const validateEnv = () => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.warn(
      `Warning: Missing environment variables: ${missing.join(", ")}. Using defaults where possible.`
    );
  }

  Object.entries(optionalEnvVars).forEach(([key, defaultValue]) => {
    if (!process.env[key]) {
      process.env[key] = defaultValue;
    }
  });
};

export const getEnvConfig = () => {
  return {
    supabase: {
      url: process.env.SUPABASE_URL,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      anonKey: process.env.SUPABASE_ANON_KEY,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expire: process.env.JWT_EXPIRE || "30d",
    },
    server: {
      port: parseInt(process.env.PORT || "5000", 10),
      nodeEnv: process.env.NODE_ENV || "development",
      corsOrigin: process.env.CORS_ORIGIN || "*",
    },
    email: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
      fromEmail: process.env.FROM_EMAIL,
      fromName: process.env.FROM_NAME,
    },
    client: {
      url: process.env.FRONTEND_URL,
    },
    isDevelopment: process.env.NODE_ENV !== "production",
    isProduction: process.env.NODE_ENV === "production",
  };
};
