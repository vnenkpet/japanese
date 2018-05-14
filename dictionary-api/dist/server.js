"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const cors = require("@koa/cors");
const json = require("koa-json");
const graphql_1 = require("./routers/graphql");
const rest_1 = require("./routers/rest");
const welcome_1 = require("./routers/welcome");
const app = new Koa();
app.use(json({ pretty: true, param: "pretty" }));
app.use(cors());
app.use(graphql_1.default.routes());
app.use(welcome_1.default.routes());
app.use(rest_1.default.routes());
exports.default = app;
//# sourceMappingURL=server.js.map