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
const type_graphql_1 = require("type-graphql");
const JmdictEntryConnection_1 = require("../schema-types/JmdictEntryConnection");
const db_1 = require("../services/db");
const Pagination_1 = require("./Pagination");
let JmdictEntryResolver = class JmdictEntryResolver {
    searchJmdictEntries(key, first = 10, after = null) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }, { sort: { "kanji.common": -1 } });
            return Pagination_1.getGraphQLConnectionFromMongoCursor(mongoQuery, first, after);
        });
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
JmdictEntryResolver = __decorate([
    type_graphql_1.Resolver(of => JmdictEntryConnection_1.default)
], JmdictEntryResolver);
exports.default = JmdictEntryResolver;
//# sourceMappingURL=JmdictEntryResolver.js.map