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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const db_1 = require("../services/db");
const JmnedictEntry_1 = require("../types/JmnedictEntry");
let JmnedictEntryResolver = class JmnedictEntryResolver {
    searchJmnedictEntries(key, limit) {
        if (!limit) {
            limit = 10;
        }
        const searchRegex = new RegExp(`^${key}`);
        return db_1.default.db
            .collection("jmnedict")
            .find({
            $or: [
                { "kanji.text": searchRegex },
                { "kana.text": searchRegex },
                { "kana.romaji": searchRegex },
                { "translation.translation.text": searchRegex }
            ]
        }, { limit })
            .toArray();
    }
};
__decorate([
    type_graphql_1.Query(returns => [JmnedictEntry_1.default]),
    __param(0, type_graphql_1.Arg("key")),
    __param(1, type_graphql_1.Arg("limit", type => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], JmnedictEntryResolver.prototype, "searchJmnedictEntries", null);
JmnedictEntryResolver = __decorate([
    type_graphql_1.Resolver(of => JmnedictEntry_1.default)
], JmnedictEntryResolver);
exports.default = JmnedictEntryResolver;
//# sourceMappingURL=JmnedictEntryResolver.js.map