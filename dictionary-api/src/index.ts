import "reflect-metadata";

import config from "./config";

import * as fs from "fs";

import { printSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";

import JmdictEntryResolver from "./resolvers/JmdictEntryResolver";
import JmnedictEntryResolver from "./resolvers/JmnedictEntryResolver";
import KanjiDicEntryResolver from "./resolvers/KanjiDicEntryResolver";
import KanjiResolver from "./resolvers/KanjiResolver";
import DbClient from "./services/db";

import { ApolloServer } from "apollo-server";

const schema = buildSchemaSync({
  resolvers: [
    JmdictEntryResolver,
    JmnedictEntryResolver,
    KanjiResolver,
    KanjiDicEntryResolver
  ]
});

fs.writeFileSync(
  "schema.graphql",
  `# This schema is auto-generated.\n\n${printSchema(schema)}`
);

const server = new ApolloServer({ schema });

async function main() {
  await DbClient.connect();
  server.listen(config.PORT, () =>
    // tslint:disable-next-line
    console.log(
      `Dictionary service is running on http://localhost:${config.PORT}`
    )
  );
}

main();
