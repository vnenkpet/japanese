import { graphql } from "graphql";

import { makeExecutableSchema } from "graphql-tools";

import * as fs from "fs";
import * as Router from "koa-router";

import JmdictEntry from "../models/JmdictEntry";
import KanjidicEntry from "../models/KanjidicEntry";
import Kanji from "../models/JmdictEntry/Kanji";

// import schema
const typeDefs = fs.readFileSync("./src/models/schema.graphql").toString();

const resolvers = {
    Query: {
        jmdictEntries: async (_: any, {key, limit} : {key: string, limit: number}) => {
            return JmdictEntry.findByKey(key, limit);
        },
        kanjidicEntries:  async (_: any, {key, limit} : {key: string, limit: number}) => {
            return KanjidicEntry.findByKey(key, limit);
        },
    },
    Kanji: {
       kanjidicEntries: async (obj: Kanji) => {
           return KanjidicEntry.find({_id: {$in: obj.kanjidic}});
       }
    }
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const router = new Router();

router.post("/graphql", async ctx => {
   const results = await graphql(schema, ctx.request.query.query);
   if (results.errors) {
       ctx.status = 400;
   }
   ctx.body = results;
});

export default router;