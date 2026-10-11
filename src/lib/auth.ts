
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;

if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URL is missing");
}

const client = new MongoClient(databaseUrl);
const db = client.db("better-auth-db");

const trustedOrigins = [
  "https://bazar-dor-seven.vercel.app",
  "https://bazar-o7qg5izne-halimachowdhurymahina-8407.vercel.app",
];

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});