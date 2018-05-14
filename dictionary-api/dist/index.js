"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const server_1 = require("./server");
dotenv.config();
mongoose.connect(process.env.MONGO_URI);
server_1.default.listen(3001);
//# sourceMappingURL=index.js.map