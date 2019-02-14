import { Db, MongoClient } from "mongodb";
import * as mongodbUri from "mongodb-uri";
import config from "../config";
import { Service } from "typedi";

@Service()
class DbClient {
    private database: Db;

    public async connect() {
        const options = mongodbUri.parse(config.MONGODB_URI);
        const uri = mongodbUri.format(options);
        const connection = await MongoClient.connect(uri, {
            useNewUrlParser: true,
        });
        this.database = connection.db(options.database);
        // tslint:disable-next-line
        console.log("Connected to DB...");
        return this.database;
    }

    get db() {
        return this.database;
    }
}

export default new DbClient();
