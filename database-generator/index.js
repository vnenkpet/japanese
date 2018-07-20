// todos:
// * add jlpt levels to each word

const got = require("got");
const unzip = require("unzip");
const fstream = require("fstream");
const tmpDir = require("os").tmpdir();
const fs = require("fs-extra");
const uuidv4 = require("uuid/v4");
const mongo = require("mongodb").MongoClient;
const ProgressBar = require("progress");
const oboe = require("oboe");
const split2 = require("split2");
const nihongo = require("nihongo");
const romaji = require("romaji");
const cheerio = require("cheerio");
const connectionString = "mongodb://127.0.0.1";
const dbName = "jmdict";
const parseNum = require("parse-num");
const { ObjectId } = require("mongodb");
const jmdictCollectionName = "jmdict";
const jmnedictCollectionName = "jmnedict";
const kanjiDicCollectionName = "kanjidic";

const jmdictUrl =
  "https://github.com/scriptin/jmdict-simplified/releases/download/2.0.0/jmdict_eng.json.zip";
const jmnedictUrl =
  "https://github.com/scriptin/jmdict-simplified/releases/download/2.0.0/jmnedict.json.zip";
const kanjiDicUrl =
  "https://raw.githubusercontent.com/jmettraux/kensaku/master/data/kanjidic.json";

const downloadJmdict = () => {
  return new Promise((resolve, reject) => {
    const outputDir = `${tmpDir}/${uuidv4()}`;
    fs.mkdirSync(outputDir);
    const outputZip = `${outputDir}/jmdict_eng.json.zip`;
    const outputFile = `${outputDir}/jmdict_eng.json`;
    const writeStream = fs.createWriteStream(outputZip);
    let progressBar = null;
    got
      .stream(jmdictUrl)
      .on("response", res => {
        const len = parseInt(res.headers["content-length"], 10);
        progressBar = new ProgressBar(
          "downloading JMDICT data [:bar] :rate/bps :percent :etas",
          {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: len
          }
        );
      })
      .on("data", data => {
        progressBar.tick(data.length);
      })
      .pipe(writeStream)
      .on("finish", () => {
        const readStream = fs.createReadStream(outputZip);
        const writeStream = fstream.Writer(outputDir);
        readStream
          .pipe(unzip.Parse())
          .pipe(writeStream)
          .on("close", () => resolve(outputFile));
      })
      .on("error", reject);
  });
};

const downloadJmNedict = () => {
  return new Promise((resolve, reject) => {
    const outputDir = `${tmpDir}/${uuidv4()}`;
    fs.mkdirSync(outputDir);
    const outputZip = `${outputDir}/jmnedict.json.zip`;
    const outputFile = `${outputDir}/jmnedict.json`;
    const writeStream = fs.createWriteStream(outputZip);
    let progressBar = null;
    got
      .stream(jmnedictUrl)
      .on("response", res => {
        const len = parseInt(res.headers["content-length"], 10);
        progressBar = new ProgressBar(
          "downloading JMNEDICT data [:bar] :rate/bps :percent :etas",
          {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: len
          }
        );
      })
      .on("data", data => {
        progressBar.tick(data.length);
      })
      .pipe(writeStream)
      .on("finish", () => {
        const readStream = fs.createReadStream(outputZip);
        const writeStream = fstream.Writer(outputDir);
        readStream
          .pipe(unzip.Parse())
          .pipe(writeStream)
          .on("close", () => resolve(outputFile));
      })
      .on("error", reject);
  });
};

const processKanjidic = db => {
  return new Promise(async resolve => {
    got
      .stream(kanjiDicUrl)
      .pipe(split2())
      .on("data", async line => {
        const kanjiEntry = JSON.parse(line);
        const entry = {
          kanjidicId: kanjiEntry.id,
          kanji: kanjiEntry.ki[0],
          kana: kanjiEntry.ka,
          romaji: kanjiEntry.ro,
          gloss: kanjiEntry.gs[1].split(";").map(gloss => gloss.trim()), // what's the [0] code?
          lo: kanjiEntry.lo // what is this?
        };
        await db.collection(kanjiDicCollectionName).insertOne(entry);
      })
      .on("end", () => {
        resolve();
      });
  });
};

const processJmdict = db => {
  return new Promise(async (resolve, reject) => {
    const outputFile = await downloadJmdict();
    oboe(fs.createReadStream(outputFile))
      .node("version", version => {
        console.log(`Processing JMDICT ${version}`);
      })
      .node("words.*", async word => {
        word.kanji = await Promise.all(
          word.kanji.map(async kanji => {
            const kanjis = nihongo.parseKanji(kanji.text);
            const ids = [];
            for (const part of kanjis) {
              const res = await db
                .collection(kanjiDicCollectionName)
                .findOne({ kanji: part });
              if (res) {
                ids.push(res._id);
              }
            }
            kanji.kanjidic = ids;
            return kanji;
          })
        );
        word.kana = word.kana.map(kana => {
          kana.romaji = romaji.fromKana(kana.text);
          return kana;
        });
        word.sense = word.sense.map(sense => {
          sense.gloss = sense.gloss.map(gloss => {
            gloss.searchKey = gloss.text.toLowerCase().trim();
            return gloss;
          });
          return sense;
        });
        await db.collection(jmdictCollectionName).insertOne(word);
      })
      .done(async things => {
        console.log(`JMDICT ${things.version} import done.`);
        resolve(true);
      });
  });
};

const processJmNedict = db => {
  return new Promise(async (resolve, reject) => {
    const outputFile = await downloadJmNedict();
    oboe(fs.createReadStream(outputFile))
      .node("version", version => {
        console.log(`Processing JMNEDICT ${version}`);
      })
      .node("words.*", async word => {
        word.kanji = await Promise.all(
          word.kanji.map(async kanji => {
            const kanjis = nihongo.parseKanji(kanji.text);
            const ids = [];
            for (const part of kanjis) {
              const res = await db
                .collection(kanjiDicCollectionName)
                .findOne({ kanji: part });
              if (res) {
                ids.push(res._id);
              }
            }
            kanji.kanjidic = ids;
            return kanji;
          })
        );
        word.kana = word.kana.map(kana => {
          kana.romaji = romaji.fromKana(kana.text);
          return kana;
        });
        word.translation = word.translation.map(translation => {
          translation.category = translation.type;
          translation.translation = translation.translation.map(translation => {
            translation.searchKey = translation.text.toLowerCase().trim();
            return translation;
          });
          return translation;
        });
        await db.collection(jmnedictCollectionName).insertOne(word);
      })
      .done(async things => {
        console.log(`JMNEDICT ${things.version} import done.`);
        resolve(true);
      });
  });
};

const main = async () => {
  let connection = await mongo.connect(connectionString);
  let db = connection.db(dbName);

  await db.dropDatabase();

  await processKanjidic(db);

  const [res1, res2] = await Promise.all([
    processJmdict(db),
    processJmNedict(db)
  ]);

  await db.collection(jmdictCollectionName).createIndex({
    "kana.text": "text",
    "kanji.text": "text",
    "kana.romaji": "text",
    "sense.gloss.text": "text"
  });

  await db.collection(jmdictCollectionName).createIndex({
    bingSearchResults: -1
  });

  await db.collection(jmnedictCollectionName).createIndex({
    "kana.text": "text",
    "kanji.text": "text",
    "kana.romaji": "text",
    "translation.translation": "text"
  });

  await db.collection(kanjiDicCollectionName).createIndex({
    kanji: "text",
    kana: "text",
    romaji: "text",
    gloss: "text"
  });

  // scrape bing results
  const getBingSearchResultsCount = async key => {
    let res = null;
    const phrase = `"${key}" language:ja`;
    try {
      res = await got(
        `https://www.bing.com/search?q=${encodeURIComponent(phrase)}`,
        {}
      );
    } catch (e) {
      throw e;
    }
    const $ = cheerio.load(res.body);
    const countBody = $(".sb_count").html();
    const count = parseNum(countBody);
    const finalCount = count ? count : 0;
    return finalCount;
  };

  let i = 0;
  let limit = 15;
  const scrapeBingResults = async jmdictEntry => {
    const commonKanji = jmdictEntry.kanji.filter(kanji => kanji.common);
    const commonKana = jmdictEntry.kana.filter(kana => kana.common);
    let key = jmdictEntry.kanji[0]
      ? jmdictEntry.kanji[0].text
      : jmdictEntry.kana[0].text;
    if (commonKana.length > 0) key = commonKana[0].text;
    if (commonKanji.length > 0) key = commonKanji[0].text;

    finalCount = await getBingSearchResultsCount(key);
    await db.collection(jmdictCollectionName).update(
      { _id: jmdictEntry._id },
      {
        $set: {
          bingSearchResults: finalCount
        }
      }
    );
  };

  console.log("scraping bing results...");
  const count = await db.collection(jmdictCollectionName).count();
  while (
    (entries = await db
      .collection(jmdictCollectionName)
      .find({})
      .skip(i)
      .limit(limit)
      .toArray())
  ) {
    console.log(`${i} of ${count}`);
    const promises = entries.map(entry => scrapeBingResults(entry));
    await Promise.all(promises);
    i += limit - 1;
  }

  connection.close();
};

main();
