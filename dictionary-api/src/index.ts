import "reflect-metadata";

import config from "./config";

import * as fs from "fs";

import { printSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";

import EntryResolver from "./resolvers/EntryResolver";
import KanjiDicEntryResolver from "./resolvers/KanjiDicEntryResolver";
import KanjiResolver from "./resolvers/KanjiResolver";
import DbClient from "./services/db";

import { ApolloServer } from "apollo-server";

import * as cluster from "cluster";
import { cpus } from "os";

const numCPUs = cpus().length;

const schema = buildSchemaSync({
  resolvers: [EntryResolver, KanjiResolver, KanjiDicEntryResolver]
});

if (config.NODE_ENV !== "production") {
  fs.writeFileSync(
    "schema.graphql",
    `# This schema is auto-generated.\n\n${printSchema(schema)}`
  );
}

// tslint:disable
async function main() {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    await DbClient.connect();

    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const server = new ApolloServer({ schema });
    server.listen(config.PORT, () =>
      // tslint:disable-next-line
      console.log(
        `Dictionary service is running on http://localhost:${config.PORT}`
      )
    );
    console.log(`Worker ${process.pid} started`);
  }
}

main();
