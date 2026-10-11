
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const databaseUrl = process.env.MONGODB_URI;

if (!databaseUrl) {
  throw new Error("MONGODB_URI is missing");
}

const client = new MongoClient(databaseUrl);
const db = client.db("better-auth-db");

const trustedOrigins = [
  "https://bazar-dor-seven.vercel.app",
  "https://bazar-bwhq6aovm-halimachowdhurymahina-8407.vercel.app",
  "https://bazar-o7qg5izne-halimachowdhurymahina-8407.vercel.app",
].filter(Boolean);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});