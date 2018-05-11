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
test("Test graphql endpoint", () => __awaiter(this, void 0, void 0, function* () {
    const query = `{ jmdictEntries (key: "test", limit: 2) { kanji { text } sense { gloss { text } } } }`;
    const res = yield request
        .post(`/graphql?query=${encodeURIComponent(query)}`)
        .set("Accept", "application/json");
    expect(res.status).toBe(200);
    const responseBody = JSON.parse(res.text);
    expect(responseBody).toMatchObject({ data: { jmdictEntries: expect.any(Array) } });
}));
//# sourceMappingURL=server.js.map