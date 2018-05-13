"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get("/", ctx => {
    ctx.body = {
        message: "Welcome!",
        name: "JMDICT and Kanji vocabulary GraphQL API service",
        resources: [
            { desc: "Welcome endpoint (current)", method: "GET", path: "/" },
            {
                desc: "GraphQL endpoint",
                method: "GET",
                path: "/graphql",
                queryParams: [{ desc: "GraphQL query", name: "query" }]
            },
            {
                desc: "REST API endpoint (deprecated, prefer GraphQL)",
                method: "GET",
                path: "/search/:key",
                routeParams: [{ desc: "Key to search by", name: "key" }]
            }
        ],
        version: "0.1.0"
    };
});
exports.default = router;
//# sourceMappingURL=welcome.js.map