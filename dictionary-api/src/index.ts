import "reflect-metadata";

import config from "./config";

import * as cors from "@koa/cors";
import * as fs from "fs";
import * as Koa from "koa";
import koaBody from "koa-bodyparser-ts";
import * as Router from "koa-router";

import { graphiqlKoa, graphqlKoa } from "apollo-server-koa";
import { printSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";

import JmdictEntryResolver from "./resolvers/JmdictEntryResolver";
import JmnedictEntryResolver from "./resolvers/JmnedictEntryResolver";
import KanjiDicEntryResolver from "./resolvers/KanjiDicEntryResolver";
import KanjiResolver from "./resolvers/KanjiResolver";
import DbClient from "./services/db";

const app = new Koa();
app.use(cors());

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

const router = new Router();

router.post("/graphql", koaBody(), graphqlKoa({ schema }));
router.get("/graphiql", graphiqlKoa({ endpointURL: "/graphql" }));

app.use(router.routes());
app.use(router.allowedMethods());

async function main() {
  await DbClient.connect();
  app.listen(config.PORT, () =>
    // tslint:disable-next-line
    console.log(
      `Dictionary service is running on http://localhost:${config.PORT}`
    )
  );
}

main();
