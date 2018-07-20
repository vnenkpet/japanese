"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongodbUri = require("mongodb-uri");
const config_1 = require("../config");
class DbClient {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = mongodbUri.parse(config_1.default.MONGODB_URI);
            const uri = mongodbUri.format(options);
            const connection = yield mongodb_1.MongoClient.connect(uri, { useNewUrlParser: true });
            this.db = connection.db(options.database);
            return this.db;
        });
    }
}
exports.default = new DbClient();
//# sourceMappingURL=db.js.map