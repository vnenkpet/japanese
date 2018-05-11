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
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const fs = require("fs");
const Router = require("koa-router");
const JmdictEntry_1 = require("../models/JmdictEntry");
const KanjidicEntry_1 = require("../models/KanjidicEntry");
// import schema
const typeDefs = fs.readFileSync("./src/models/schema.graphql").toString();
const resolvers = {
    Query: {
        jmdictEntries: (_, { key, limit }) => __awaiter(this, void 0, void 0, function* () {
            return JmdictEntry_1.default.findByKey(key, limit);
        }),
        kanjidicEntries: (_, { key, limit }) => __awaiter(this, void 0, void 0, function* () {
            return KanjidicEntry_1.default.findByKey(key, limit);
        }),
    },
    Kanji: {
        kanjidicEntries: (obj) => __awaiter(this, void 0, void 0, function* () {
            return KanjidicEntry_1.default.find({ _id: { $in: obj.kanjidic } });
        })
    }
};
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers,
});
const router = new Router();
router.post("/graphql", (ctx) => __awaiter(this, void 0, void 0, function* () {
    const results = yield graphql_1.graphql(schema, ctx.request.query.query);
    if (results.errors) {
        ctx.status = 400;
    }
    ctx.body = results;
}));
exports.default = router;
//# sourceMappingURL=graphql.js.map