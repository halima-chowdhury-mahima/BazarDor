import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
  throw new Error("MONGODB_URI is missing.");
}

if (
  !uri.startsWith("mongodb+srv://") &&
  !uri.startsWith("mongodb://")
) {
  throw new Error("Invalid MongoDB connection string.");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const baseURL = process.env.BETTER_AUTH_URL?.trim();

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is missing.");
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db("bazardor"), {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,

  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-git-main-halimachowdhurymahina-8407.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },
});