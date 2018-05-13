import * as supertest from "supertest";
import server from "../server";

import * as dotenv from "dotenv";

import * as mongoose from "mongoose";

let request: any;

beforeAll(() => {
    request = supertest(server.listen());

    dotenv.config();
    mongoose.connect(process.env.MONGO_URI_TEST);
});

test("Test graphql endpoint", async () => {
    const query = `{ jmdictEntries (key: "test", limit: 2) { kanji { text } sense { gloss { text } } } }`;

    const res: {} = await request
        .get(`/graphql?query=${encodeURIComponent(query)}`)
        .set("Accept", "application/json");


    expect(res).toMatchObject({
        body: {
            data: {jmdictEntries: expect.any(Array)}
        },
        status: 200,
    });
});