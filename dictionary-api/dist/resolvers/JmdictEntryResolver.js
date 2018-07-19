"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_64_1 = require("base-64");
const jp_conjugation_1 = require("jp-conjugation");
const type_graphql_1 = require("type-graphql");
const db_1 = require("../services/db");
const Conjugation_1 = require("../types/Conjugation");
const JmdictEntry_1 = require("../types/JmdictEntry");
const JmdictEntryConnection_1 = require("../types/JmdictEntryConnection");
var VERB_TYPE;
(function (VERB_TYPE) {
    VERB_TYPE[VERB_TYPE["v5u"] = 0] = "v5u";
    VERB_TYPE[VERB_TYPE["v5k"] = 1] = "v5k";
    VERB_TYPE[VERB_TYPE["v5g"] = 2] = "v5g";
    VERB_TYPE[VERB_TYPE["v5s"] = 3] = "v5s";
    VERB_TYPE[VERB_TYPE["v5t"] = 4] = "v5t";
    VERB_TYPE[VERB_TYPE["v5m"] = 5] = "v5m";
    VERB_TYPE[VERB_TYPE["v5b"] = 6] = "v5b";
    VERB_TYPE[VERB_TYPE["v5n"] = 7] = "v5n";
    VERB_TYPE[VERB_TYPE["v5r"] = 8] = "v5r";
    VERB_TYPE[VERB_TYPE["v1"] = 9] = "v1";
})(VERB_TYPE || (VERB_TYPE = {}));
let JmdictEntryResolver = class JmdictEntryResolver {
    searchJmdictEntries(key, first = 10, after = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // decode cursor:
            let offset = 0;
            if (after) {
                offset = +base_64_1.decode(after);
            }
            // prepare search regex:
            const searchRegex = new RegExp(`^${key.trim()}$`);
            const verbSearchRegex = new RegExp(`^to ${key.trim()}$`);
            // prepare the mongo request
            const mongoQuery = yield db_1.default.db.collection("jmdict").find({
                $or: [
                    { "kanji.text": searchRegex },
                    { "kana.text": searchRegex },
                    { "kana.romaji": searchRegex },
                    { "sense.gloss.text": searchRegex },
                    { "sense.gloss.text": verbSearchRegex }
                ]
            });
            // get totalCount and entries for nodes
            const [totalCount, entries] = yield Promise.all([
                mongoQuery.count(),
                mongoQuery
                    .skip(offset)
                    .limit(first)
                    .sort({ "kanji.common": -1 })
                    .toArray()
            ]);
            // get startCursor and endCursor
            const startCursor = base_64_1.encode(`${offset}`);
            const endCursor = base_64_1.encode(`${offset + entries.length}`);
            // return graphql connection response
            return {
                edges: entries.map((entry, index) => {
                    return {
                        cursor: base_64_1.encode(`${offset + index + 1}`),
                        node: entry
                    };
                }),
                pageInfo: {
                    endCursor,
                    hasNextPage: offset + first <= totalCount - 1,
                    startCursor
                },
                totalCount
            };
        });
    }
    conjugations(root) {
        if (root.sense[0].partOfSpeech.some(pos => pos in VERB_TYPE)) {
            return jp_conjugation_1.conjugate(root.kanji[0].text);
        }
        else {
            return null;
        }
    }
};
__decorate([
    type_graphql_1.Query(returns => JmdictEntryConnection_1.default),
    __param(0, type_graphql_1.Arg("key")),
    __param(1, type_graphql_1.Arg("first", type => type_graphql_1.Int, { nullable: true })),
    __param(2, type_graphql_1.Arg("after", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], JmdictEntryResolver.prototype, "searchJmdictEntries", null);
__decorate([
    type_graphql_1.FieldResolver(returns => [Conjugation_1.default]),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [JmdictEntry_1.default]),
    __metadata("design:returntype", Array)
], JmdictEntryResolver.prototype, "conjugations", null);
JmdictEntryResolver = __decorate([
    type_graphql_1.Resolver(of => JmdictEntryConnection_1.default)
], JmdictEntryResolver);
exports.default = JmdictEntryResolver;
//# sourceMappingURL=JmdictEntryResolver.js.map