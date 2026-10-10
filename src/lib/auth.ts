
import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI?.trim();
const baseURL = process.env.BETTER_AUTH_URL?.trim();
const secret = process.env.BETTER_AUTH_SECRET;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is missing");
}

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET is missing");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 10000,
  });

globalForMongo.mongoClient = client;

const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  secret,

  baseURL,

  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-seven.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },
});
