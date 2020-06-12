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
const mongodb_1 = require("mongodb");
const mongodbUri = require("mongodb-uri");
const MONGODB_URI = "mongodb://admin:Jap21167@ds159401-a0.mlab.com:59401,ds159401-a1.mlab.com:59401/densha-jisho-dictionary?replicaSet=rs-ds159401";
const options = mongodbUri.parse(MONGODB_URI);
const uri = mongodbUri.format(options);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield mongodb_1.MongoClient.connect(uri, { useNewUrlParser: true });
        const db = connection.db(options.database);
        yield db.collection("entries").updateMany({ jlpt: "n01" }, { $set: { jlpt: "n1" } });
        yield db.collection("entries").updateMany({ jlpt: "n11" }, { $set: { jlpt: "n2" } });
        yield db.collection("entries").updateMany({ jlpt: "n21" }, { $set: { jlpt: "n3" } });
        yield db.collection("entries").updateMany({ jlpt: "n31" }, { $set: { jlpt: "n4" } });
        yield db.collection("entries").updateMany({ jlpt: "n41" }, { $set: { jlpt: "n5" } });
        // const count = await db.collection("entries").count({});
        // console.log(`Current dictionary entries count: ${count}`);
        // console.log(count);
        // const files = await Promise.all(
        //     [1,2,3,4,5].map(val => got(`https://raw.githubusercontent.com/Gnurou/tagainijisho/master/src/core/jmdict/jlpt-n${val}.csv`)),
        // );
        // let ids = files.map((content, index)=>{
        //     return content.body.split("\n");
        // })
        // const jlptCount = ids.map(arr => arr.length).reduce((a, b) => a + b);
        // console.log(`JLPT count = ${jlptCount}`);
        // let errorCount = 0;
        // let i = 0;
        // for(let jlpt in ids) {
        //     for(let id in ids[jlpt]) {
        //         const jmdictId = ids[jlpt][id];
        //         const word = await db.collection("entries").updateOne({id: Number(jmdictId)}, { $set: { jlpt: `n${(Number(jlpt)+1)}` } });
        //         if (word) {
        //             console.log(`${i++}/${jlptCount}`);
        //         } else {
        //             errorCount++;
        //         }
        //     }
        // }
        // console.log(`Processed ${jlptCount}, out of which ${errorCount} failed`);
    });
}
main();
//# sourceMappingURL=index.js.map