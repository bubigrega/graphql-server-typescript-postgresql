import "reflect-metadata";

import * as path from "path";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { createConnection } from "typeorm";

import { resolvers } from "./resolvers/resolvers";

export const startServer = async () => {
  const typeDefs = importSchema(path.join(__dirname, "/schema/schema.graphql"));

  const app = new GraphQLServer({ typeDefs, resolvers });

  await createConnection();

  await app.start();

  console.log("Server is running on localhost:4000");
};

startServer();
