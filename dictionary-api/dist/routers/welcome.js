"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get("/", ctx => {
    ctx.body = {
        message: "Welcome!",
        name: "JMDICT and Kanji vocabulary GraphQL API service",
        resources: [
            { method: "GET", path: "/", desc: "Welcome endpoint (current)" },
            {
                method: "GET",
                path: "/graphql",
                desc: "GraphQL query endpoint",
                queryParams: [{ name: "query", desc: "GraphQL query" }]
            },
            {
                method: "GET",
                path: "/search/:key",
                routeParams: [{ name: "key", desc: "Key to search by" }]
            }
        ],
        version: "0.1.0"
    };
});
exports.default = router;
//# sourceMappingURL=welcome.js.map