"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodbUri = require("mongodb-uri");
const monk_1 = require("monk");
const config_1 = require("../config");
const options = mongodbUri.parse(config_1.default.MONGODB_URI);
const uri = mongodbUri.format(options);
const db = monk_1.default(uri);
exports.default = db;
//# sourceMappingURL=db.js.map