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
const graphql_tools_1 = require("graphql-tools");
const fs = require("fs");
const Router = require("koa-router");
const JmdictEntry_1 = require("../models/JmdictEntry");
const JmnedictEntry_1 = require("../models/JmnedictEntry");
const KanjidicEntry_1 = require("../models/KanjidicEntry");
const apollo_server_koa_1 = require("apollo-server-koa");
// import schema
const typeDefs = fs.readFileSync("./src/models/schema.graphql").toString();
const resolvers = {
    Kanji: {
        kanjidicEntries: (obj) => __awaiter(this, void 0, void 0, function* () {
            return KanjidicEntry_1.default.find({ _id: { $in: obj.kanjidic } });
        })
    },
    Query: {
        jmdictEntries: (_, { key, limit }) => __awaiter(this, void 0, void 0, function* () {
            return JmdictEntry_1.default.findByKey(key, limit);
        }),
        jmnedictEntries: (_, { key, limit }) => __awaiter(this, void 0, void 0, function* () {
            return JmnedictEntry_1.default.findByKey(key, limit);
        }),
        kanjidicEntries: (_, { key, limit }) => __awaiter(this, void 0, void 0, function* () {
            return KanjidicEntry_1.default.findByKey(key, limit);
        })
    }
};
const router = new Router();
const schema = graphql_tools_1.makeExecutableSchema({
    resolvers,
    typeDefs
});
router.get("/graphql", apollo_server_koa_1.graphqlKoa({ schema }));
exports.default = router;
//# sourceMappingURL=graphql.js.map