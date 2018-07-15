"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = require("./config");
const cors = require("@koa/cors");
const fs = require("fs");
const Koa = require("koa");
const koa_bodyparser_ts_1 = require("koa-bodyparser-ts");
const Router = require("koa-router");
const apollo_server_koa_1 = require("apollo-server-koa");
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const JmdictEntryResolver_1 = require("./resolvers/JmdictEntryResolver");
const JmnedictEntryResolver_1 = require("./resolvers/JmnedictEntryResolver");
const app = new Koa();
app.use(cors());
const schema = type_graphql_1.buildSchemaSync({
    resolvers: [JmdictEntryResolver_1.default, JmnedictEntryResolver_1.default]
});
fs.writeFileSync("schema.graphql", `# This schema is auto-generated.\n\n${graphql_1.printSchema(schema)}`);
const router = new Router();
router.post("/graphql", koa_bodyparser_ts_1.default(), apollo_server_koa_1.graphqlKoa({ schema }));
router.get("/graphiql", apollo_server_koa_1.graphiqlKoa({ endpointURL: "/graphql" }));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(config_1.default.PORT, () => 
// tslint:disable-next-line
console.log(`Lusk Core is running on http://localhost:${config_1.default.PORT}`));
//# sourceMappingURL=index.js.map