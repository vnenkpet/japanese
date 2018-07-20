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
const Gloss_1 = require("./Gloss");
let Sense = class Sense {
};
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Sense.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Sense.prototype, "dialect", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Sense.prototype, "misc", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Sense.prototype, "info", void 0);
__decorate([
    type_graphql_1.Field(type => [Gloss_1.default]),
    __metadata("design:type", Array)
], Sense.prototype, "gloss", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Sense.prototype, "partOfSpeech", void 0);
Sense = __decorate([
    type_graphql_1.ObjectType()
], Sense);
exports.default = Sense;
//# sourceMappingURL=Sense.js.map