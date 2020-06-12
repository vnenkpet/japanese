import * as got from "got";

import { Db, MongoClient } from "mongodb";
import * as mongodbUri from "mongodb-uri";

const MONGODB_URI = "fill";
const options = mongodbUri.parse(MONGODB_URI);
const uri = mongodbUri.format(options);

async function main() {
    const connection = await MongoClient.connect(
        uri,
        { useNewUrlParser: true }
      );
    const db = connection.db(options.database);
    const count = await db.collection("entries").count({});
    console.log(`Current dictionary entries count: ${count}`);
    console.log(count);
    const files = await Promise.all(
        [1,2,3,4,5].map(val => got(`https://raw.githubusercontent.com/Gnurou/tagainijisho/master/src/core/jmdict/jlpt-n${val}.csv`)),
    );

    let ids = files.map((content, index)=>{
        return content.body.split("\n");
    })
    const jlptCount = ids.map(arr => arr.length).reduce((a, b) => a + b);
    console.log(`JLPT count = ${jlptCount}`);
    let errorCount = 0;
    let i = 0;
    for(let jlpt in ids) {
        for(let id in ids[jlpt]) {
            const jmdictId = ids[jlpt][id];
            const word = await db.collection("entries").updateOne({id: Number(jmdictId)}, { $set: { jlpt: `n${(Number(jlpt)+1)}` } });
            if (word) {
                console.log(`${i++}/${jlptCount}`);
            } else {
                errorCount++;
            }
        }
    }
    console.log(`Processed ${jlptCount}, out of which ${errorCount} failed`);
}

main();