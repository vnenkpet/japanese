"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = require("./config");
const fs = require("fs");
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const JmdictEntryResolver_1 = require("./resolvers/JmdictEntryResolver");
const JmnedictEntryResolver_1 = require("./resolvers/JmnedictEntryResolver");
const KanjiDicEntryResolver_1 = require("./resolvers/KanjiDicEntryResolver");
const KanjiResolver_1 = require("./resolvers/KanjiResolver");
const db_1 = require("./services/db");
const apollo_server_1 = require("apollo-server");
const schema = type_graphql_1.buildSchemaSync({
    resolvers: [
        JmdictEntryResolver_1.default,
        JmnedictEntryResolver_1.default,
        KanjiResolver_1.default,
        KanjiDicEntryResolver_1.default
    ]
});
fs.writeFileSync("schema.graphql", `# This schema is auto-generated.\n\n${graphql_1.printSchema(schema)}`);
const server = new apollo_server_1.ApolloServer({ schema });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.connect();
        server.listen(config_1.default.PORT, () => 
        // tslint:disable-next-line
        console.log(`Dictionary service is running on http://localhost:${config_1.default.PORT}`));
    });
}
main();
//# sourceMappingURL=index.js.map