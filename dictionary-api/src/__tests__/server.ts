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

test("Test welcome endpoint", done => {
  request
    .get("/")
    .set("Accept", "application/json")
    .then((res: { status: number; text: string }) => {
      expect(res.status).toBe(200);
      const responseBody = JSON.parse(res.text);
      expect(responseBody).toMatchObject({ version: expect.any(String) });
      done();
    });
});

test("Test graphql endpoint", async () => {
  const query = `{ jmdictEntries (key: "test", limit: 2) { kanji { text } sense { gloss { text } } } }`;

  const res: { status: number; text: string } = await request
    .get(`/graphql?query=${encodeURIComponent(query)}`)
    .set("Accept", "application/json");

  expect(res.status).toBe(200);
  const responseBody = JSON.parse(res.text);
  expect(responseBody).toMatchObject({
    data: { jmdictEntries: expect.any(Array) }
  });
});
