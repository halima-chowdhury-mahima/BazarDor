import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const client = new MongoClient(uri, {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 10000,
});

const db = client.db("bazardor");

const baseURL = process.env.BETTER_AUTH_URL?.trim();

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is missing");
}

export const auth = betterAuth({
  database: mongodbAdapter(db),

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL,

  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-seven.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },
});