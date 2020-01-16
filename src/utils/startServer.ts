import * as path from "path";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { ormConnection } from "./ormConnection";

import { resolvers } from "../resolvers/resolvers";

export const startServer = async () => {
  const typeDefs = importSchema(
    path.join(__dirname, "../schema/schema.graphql")
  );

  const server = new GraphQLServer({ typeDefs, resolvers });

  await ormConnection();

  const app = await server.start({
    port: process.env.NODE_ENV === "development" ? 4000 : 0
  });

  const { port }: any = app.address();

  console.log(`Server is running on http://localhost:${port}`);

  return app;
};
