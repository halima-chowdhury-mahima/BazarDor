import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
  throw new Error("MONGODB_URI is missing.");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const productionURL = process.env.BETTER_AUTH_URL?.trim();

const trustedOrigins = [
  "http://localhost:3000",
  productionURL,
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined,
  process.env.VERCEL_BRANCH_URL
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : undefined,
].filter((url): url is string => Boolean(url));

export const auth = betterAuth({
  database: mongodbAdapter(client.db("bazardor"), {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: productionURL,

  trustedOrigins,

  emailAndPassword: {
    enabled: true,
  },
});