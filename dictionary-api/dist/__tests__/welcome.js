"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const server_1 = require("../server");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
let request;
beforeAll(() => {
    request = supertest(server_1.default.listen());
    dotenv.config();
    mongoose.connect(process.env.MONGO_URI_TEST);
});
test("Test welcome endpoint", done => {
    request
        .get("/")
        .set("Accept", "application/json")
        .then((res) => {
        expect(res.status).toBe(200);
        const responseBody = JSON.parse(res.text);
        expect(responseBody).toMatchObject({ version: expect.any(String) });
        done();
    });
});
//# sourceMappingURL=welcome.js.map