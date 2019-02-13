import "reflect-metadata";

import config from "./config";
import { useContainer, buildSchemaSync } from "type-graphql";

import { Container } from "typedi";
import EntryResolver from "./resolvers/EntryResolver";
import KanjiDicEntryResolver from "./resolvers/KanjiDicEntryResolver";
import KanjiResolver from "./resolvers/KanjiResolver";
import dbClient from "./services/db";

import { ApolloServer } from "apollo-server";

import cluster from "cluster";
import { cpus } from "os";
import { Db } from "mongodb";

const numCPUs = cpus().length;

useContainer(Container);

const schema = buildSchemaSync({
  resolvers: [EntryResolver, KanjiResolver, KanjiDicEntryResolver],
});

async function main() {
  if (cluster.isMaster) {
    // tslint:disable-next-line
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      // tslint:disable-next-line
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    const db = await dbClient.connect();
    Container.set(Db, db);

    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const playground = {
      settings: {
        "editor.cursorShape": "line",
      } as any,
    };

    const server = new ApolloServer({
      schema,
      playground,
    });

    server.listen(config.PORT, () =>
      // tslint:disable-next-line
      console.log(
        `Dictionary service is running on http://localhost:${config.PORT}`,
      ),
    );

    // tslint:disable-next-line
    console.log(`Worker ${process.pid} started`);
  }
}

main();
