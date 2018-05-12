import { makeExecutableSchema } from "graphql-tools";

import * as fs from "fs";
import * as Router from "koa-router";

import JmdictEntry from "../models/JmdictEntry";
import JmnedictEntry from "../models/JmnedictEntry";
import Kanji from "../models/JmdictEntry/Kanji";
import KanjidicEntry from "../models/KanjidicEntry";

import { graphqlKoa } from "apollo-server-koa";

// import schema
const typeDefs = fs.readFileSync("./src/models/schema.graphql").toString();

const resolvers = {
  Kanji: {
    kanjidicEntries: async (obj: Kanji) => {
      return KanjidicEntry.find({ _id: { $in: obj.kanjidic } });
    }
  },
  Query: {
    jmdictEntries: async (
      _: any,
      { key, limit }: { key: string; limit: number }
    ) => {
      return JmdictEntry.findByKey(key, limit);
    },
    jmnedictEntries: async (
        _: any,
        { key, limit }: { key: string; limit: number }
    ) => {
        return JmnedictEntry.findByKey(key, limit);
    },
    kanjidicEntries: async (
      _: any,
      { key, limit }: { key: string; limit: number }
    ) => {
      return KanjidicEntry.findByKey(key, limit);
    }
  }
};

const router = new Router();

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});

router.get("/graphql", graphqlKoa({ schema }));

export default router;
