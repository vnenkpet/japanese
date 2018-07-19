import { Db, MongoClient } from "mongodb";
import * as mongodbUri from "mongodb-uri";
import config from "../config";

class DbClient {
  public db: Db;

  public async connect() {
    const options = mongodbUri.parse(config.MONGODB_URI);
    const uri = mongodbUri.format(options);
    const connection = await MongoClient.connect(
      uri,
      { useNewUrlParser: true }
    );
    this.db = connection.db(options.database); // todo
    return this.db;
  }
}

export default new DbClient();
