import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing. Set it in Vercel Environment Variables."
  );
}

if (
  !uri.startsWith("mongodb+srv://") &&
  !uri.startsWith("mongodb://")
) {
  throw new Error(
    "Invalid MONGODB_URI. Connection string must start with mongodb+srv:// or mongodb://."
  );
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ??
  new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db("bazardor"), {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },
});