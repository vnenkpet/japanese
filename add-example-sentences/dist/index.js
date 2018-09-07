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
const got = require("got");
const readline_1 = require("readline");
// const MONGODB_URI = "fill";
// const options = mongodbUri.parse(MONGODB_URI);
// const uri = mongodbUri.format(options);
var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
function testPromise() {
    return new Promise((res) => {
        setTimeout(() => {
            console.log("Waited");
            res(true);
        }, 1000);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const connection = await MongoClient.connect(
        //     uri,
        //     { useNewUrlParser: true }
        //   );
        // const db = connection.db(options.database);
        const res = yield got.post("https://jmdict.denshajisho.com", { json: true, body: { query: `{
      searchEntries(key: "train", first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }` } });
        console.log(res.body);
        const results = {};
        var lineReader = readline_1.createInterface({
            input: require('fs').createReadStream('data/examples.utf.example.txt'),
        });
        let i = 0;
        lineReader.on('line', (line) => __awaiter(this, void 0, void 0, function* () {
            yield testPromise();
            console.log(i++);
            console.log(line);
            // const line = decoder.write(chunk);
            // const [sentence, japaneseDetails] = line.split("B:");
            // const [japanese, englishRaw] = sentence.split("\t");
            // const english = englishRaw.split("\#")[0];    
            // const words = japaneseDetails.split("\ ").map((word: string) => {
            //   console.log(`Matches for word ${word}`);
            //   let hiragana, sentenceForm, senseIndex;
            //   // strip the word
            //   word = word.replace(/\((\S+)\)/, (match: string, capture) => {hiragana = capture; return ""});
            //   word = word.replace(/\{(\S+)\}/, (match: string, capture) => {sentenceForm = capture; return ""});
            //   word = word.replace(/\[(\S+)\]/, (match: string, capture) => {senseIndex = capture; return ""});
            //   word = word.replace("~", "");
            //   word = word.trim();
            //   console.log(`word: ${word}: ${japanese} | ${english}`);
            //   results[word] ? results[word].push({japanese, english, japaneseDetails}) : results[word] = [{japanese, english, japaneseDetails}]; 
            // });
        }));
        lineReader.on("error", console.log);
    });
}
main();
//# sourceMappingURL=index.js.map