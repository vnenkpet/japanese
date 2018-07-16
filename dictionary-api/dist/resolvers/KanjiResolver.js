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
const Kanji_1 = require("../types/Kanji");
const KanjiDicEntry_1 = require("../types/KanjiDicEntry");
let KanjiResolver = class KanjiResolver {
    kanjidic(kanji) {
        return db_1.default.db
            .collection("kanjidic")
            .find({ _id: { $in: kanji.kanjidic } })
            .toArray();
    }
};
__decorate([
    type_graphql_1.FieldResolver(returns => [KanjiDicEntry_1.default]),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Kanji_1.default]),
    __metadata("design:returntype", void 0)
], KanjiResolver.prototype, "kanjidic", null);
KanjiResolver = __decorate([
    type_graphql_1.Resolver(of => Kanji_1.default)
], KanjiResolver);
exports.default = KanjiResolver;
//# sourceMappingURL=KanjiResolver.js.map