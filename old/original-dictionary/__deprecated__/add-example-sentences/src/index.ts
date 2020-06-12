import * as got from "got";

import { Db, MongoClient } from "mongodb";
import * as mongodbUri from "mongodb-uri";
import { WSAECONNREFUSED } from "constants";
import { exists } from "fs";
import * as co from "co";
import { AsyncResource } from "async_hooks";
// const MONGODB_URI = "fill";
// const options = mongodbUri.parse(MONGODB_URI);
// const uri = mongodbUri.format(options);

var fs = require('fs');
var DelimiterStream = require('delimiter-stream');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

async function main() {
    // const connection = await MongoClient.connect(
    //     uri,
    //     { useNewUrlParser: true }
    //   );
    // const db = connection.db(options.database);

    var linestream = new DelimiterStream({delimiter: "A:"});
 
    const res = await got.post("https://jmdict.denshajisho.com", { json: true, body: { query: `{
      searchEntries(key: "train", first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }`} });
    console.log(res.body);

    var input = fs.createReadStream("data/examples.utf.example.txt");
     
    const results: { [index:string] : [{japanese: string, english: string, japaneseDetails: string}] } = {};

    linestream.on('data', (chunk: string) => { 
      const line = decoder.write(chunk);
      const [sentence, japaneseDetails] = line.split("B:");
      const [japanese, englishRaw] = sentence.split("\t");
      const english = englishRaw.split("\#")[0];    
      const words = japaneseDetails.split("\ ").map((word: string) => {
        console.log(`Matches for word ${word}`);
        let hiragana, sentenceForm, senseIndex;
        // strip the word
        word = word.replace(/\((\S+)\)/, (match: string, capture) => {hiragana = capture; return ""});
        word = word.replace(/\{(\S+)\}/, (match: string, capture) => {sentenceForm = capture; return ""});
        word = word.replace(/\[(\S+)\]/, (match: string, capture) => {senseIndex = capture; return ""});
        word = word.replace("~", "");
        word = word.trim();
        console.log(`word: ${word}: ${japanese} | ${english}`);
        results[word] ? results[word].push({japanese, english, japaneseDetails}) : results[word] = [{japanese, english, japaneseDetails}]; 
      });
    });
     
    input.pipe(linestream);
    input.on("end", () => console.log(results));
}

main();