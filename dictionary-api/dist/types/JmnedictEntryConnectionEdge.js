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
const IEdge_1 = require("./IEdge");
const JmnedictEntry_1 = require("./JmnedictEntry");
let JmnedictEntryConnectionEdge = class JmnedictEntryConnectionEdge {
};
__decorate([
    type_graphql_1.Field(type => JmnedictEntry_1.default),
    __metadata("design:type", JmnedictEntry_1.default)
], JmnedictEntryConnectionEdge.prototype, "node", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], JmnedictEntryConnectionEdge.prototype, "cursor", void 0);
JmnedictEntryConnectionEdge = __decorate([
    type_graphql_1.ObjectType({ implements: IEdge_1.default })
], JmnedictEntryConnectionEdge);
exports.default = JmnedictEntryConnectionEdge;
//# sourceMappingURL=JmnedictEntryConnectionEdge.js.map