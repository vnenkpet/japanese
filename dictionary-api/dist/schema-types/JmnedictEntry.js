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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Kana_1 = require("./Kana");
const Kanji_1 = require("./Kanji");
const Translation_1 = require("./Translation");
let JmnedictEntry = class JmnedictEntry {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], JmnedictEntry.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(type => [Kanji_1.default]),
    __metadata("design:type", Array)
], JmnedictEntry.prototype, "kanji", void 0);
__decorate([
    type_graphql_1.Field(type => [Kana_1.default]),
    __metadata("design:type", Array)
], JmnedictEntry.prototype, "kana", void 0);
__decorate([
    type_graphql_1.Field(type => [Translation_1.default]),
    __metadata("design:type", Array)
], JmnedictEntry.prototype, "translation", void 0);
JmnedictEntry = __decorate([
    type_graphql_1.ObjectType()
], JmnedictEntry);
exports.default = JmnedictEntry;
//# sourceMappingURL=JmnedictEntry.js.map