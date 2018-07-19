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
const JmdictEntry_1 = require("../types/JmdictEntry");
const KanjiDicEntry_1 = require("../types/KanjiDicEntry");
let KanjiDicEntryResolver = class KanjiDicEntryResolver {
    getKanjiDicInformation(kanji) {
        return db_1.default.db.collection("kanjidic").findOne({ kanji });
    }
    searchKanjiDicEntries(key) {
        return db_1.default.db
            .collection("kanjidic")
            .find({
            $or: [{ kanji: key }, { kana: key }, { romaji: key }, { gloss: key }]
        })
            .toArray();
    }
    wordsContainingThis(root, limit) {
        return db_1.default.db
            .collection("jmdict")
            .find({ "kanji.text": new RegExp(`${root.kanji}`) }, { limit, sort: { "kanji.common": -1 } })
            .toArray();
    }
};
__decorate([
    type_graphql_1.Query(returns => KanjiDicEntry_1.default),
    __param(0, type_graphql_1.Arg("kanji")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KanjiDicEntryResolver.prototype, "getKanjiDicInformation", null);
__decorate([
    type_graphql_1.Query(returns => [KanjiDicEntry_1.default]),
    __param(0, type_graphql_1.Arg("key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KanjiDicEntryResolver.prototype, "searchKanjiDicEntries", null);
__decorate([
    type_graphql_1.FieldResolver(returns => [JmdictEntry_1.default]),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Arg("limit", type => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KanjiDicEntry_1.default, Number]),
    __metadata("design:returntype", void 0)
], KanjiDicEntryResolver.prototype, "wordsContainingThis", null);
KanjiDicEntryResolver = __decorate([
    type_graphql_1.Resolver(of => KanjiDicEntry_1.default)
], KanjiDicEntryResolver);
exports.default = KanjiDicEntryResolver;
//# sourceMappingURL=KanjiDicEntryResolver.js.map