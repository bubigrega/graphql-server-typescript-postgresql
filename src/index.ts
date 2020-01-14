import "reflect-metadata";

import * as path from "path";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers/resolvers";
import { createConnection } from "typeorm";

const typeDefs = importSchema(path.join(__dirname, "/schema/schema.graphql"));

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
