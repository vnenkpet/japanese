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
const type_graphql_1 = require("type-graphql");
const db_1 = require("../services/db");
const JmnedictEntry_1 = require("../schema-types/JmnedictEntry");
const JmnedictEntryConnection_1 = require("../schema-types/JmnedictEntryConnection");
const JmnedictEntryConnectionEdge_1 = require("../schema-types/JmnedictEntryConnectionEdge");
let JmnedictEntryResolver = class JmnedictEntryResolver {
    searchJmnedictEntries(key, first = 10, after = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // decode cursor:
            let offset = 0;
            if (after) {
                offset = +base_64_1.decode(after);
            }
            // prepare regex:
            const searchRegex = new RegExp(`^${key.trim()}$`);
            // prepare the mongo request
            const mongoQuery = yield db_1.default.db.collection("jmnedict").find({
                $or: [
                    { "kanji.text": searchRegex },
                    { "kana.text": searchRegex },
                    { "kana.romaji": searchRegex },
                    { "translation.translation.text": searchRegex }
                ]
            });
            // get totalCount and entries for nodes
            const totalCount = yield mongoQuery.count();
            const entries = yield mongoQuery
                .skip(offset)
                .limit(first)
                .sort({ "kanji.common": -1 })
                .toArray();
            // map entries and and find endCursor
            let endCursor = null;
            const edges = entries.map((entry, index) => {
                const edge = new JmnedictEntryConnectionEdge_1.default();
                endCursor = base_64_1.encode(`${offset + index + 1}`);
                edge.cursor = endCursor;
                edge.node = entry;
                return edge;
            });
            // return graphql connection
            return {
                edges,
                pageInfo: {
                    endCursor,
                    hasNextPage: offset + first < totalCount - 1
                },
                totalCount
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => JmnedictEntryConnection_1.default),
    __param(0, type_graphql_1.Arg("key")),
    __param(1, type_graphql_1.Arg("first", type => type_graphql_1.Int, { nullable: true })),
    __param(2, type_graphql_1.Arg("after", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], JmnedictEntryResolver.prototype, "searchJmnedictEntries", null);
JmnedictEntryResolver = __decorate([
    type_graphql_1.Resolver(of => JmnedictEntry_1.default)
], JmnedictEntryResolver);
exports.default = JmnedictEntryResolver;
//# sourceMappingURL=JmnedictEntryResolver.js.map