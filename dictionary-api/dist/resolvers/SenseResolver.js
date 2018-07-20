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
const jp_conjugation_1 = require("jp-conjugation");
const type_graphql_1 = require("type-graphql");
const Conjugation_1 = require("../schema-types/Conjugation");
const Sense_1 = require("../schema-types/Sense");
// redeclare enums so we can check against them when requesting verb conjugations
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
let SenseResolver = class SenseResolver {
    conjugations(root) {
        if (root.partOfSpeech.some(pos => pos in VERB_TYPE)) {
            return jp_conjugation_1.conjugate(root.kanji[0].text);
        }
        else {
            return null;
        }
    }
};
__decorate([
    type_graphql_1.FieldResolver(returns => [Conjugation_1.default]),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Sense_1.default]),
    __metadata("design:returntype", void 0)
], SenseResolver.prototype, "conjugations", null);
SenseResolver = __decorate([
    type_graphql_1.ObjectType()
], SenseResolver);
exports.default = SenseResolver;
//# sourceMappingURL=SenseResolver.js.map