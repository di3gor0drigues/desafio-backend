import "reflect-metadata";
import { createConnection } from "typeorm";
import { GraphQLServer } from 'graphql-yoga'
import * as path from 'path'
import { resolver } from './resolvers/resolvers'

(async () => {
  await createConnection()

  const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, './schema/schema.graphql'),
    resolvers: [resolver]
  })

  server.start(() => console.log('Server is running on localhost:4000'))
})()
