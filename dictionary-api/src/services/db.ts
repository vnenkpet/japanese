import * as mongodbUri from "mongodb-uri";
import monk from "monk";
import config from "../config";

const options = mongodbUri.parse(config.MONGODB_URI);
const uri = mongodbUri.format(options);
const db = monk(uri);

export default db;
