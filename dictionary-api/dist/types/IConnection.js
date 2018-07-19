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
const PageInfo_1 = require("./PageInfo");
let IConnection = class IConnection {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], IConnection.prototype, "totalCount", void 0);
__decorate([
    type_graphql_1.Field(type => [IEdge_1.default]),
    __metadata("design:type", Array)
], IConnection.prototype, "edges", void 0);
__decorate([
    type_graphql_1.Field(type => PageInfo_1.default),
    __metadata("design:type", PageInfo_1.default)
], IConnection.prototype, "pageInfo", void 0);
IConnection = __decorate([
    type_graphql_1.InterfaceType()
], IConnection);
exports.default = IConnection;
//# sourceMappingURL=IConnection.js.map