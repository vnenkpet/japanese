import * as dotenv from "dotenv";
import { envVar, toNumber, toString } from "typescript-stringcaster";
dotenv.config();

const source = process.env;

class Config {
    @envVar({ cast: toString, source })
    public MONGODB_URI: string;

    @envVar({ cast: toString, source })
    public MONGODB_URI_TEST: string;

    @envVar({ cast: toNumber, source })
    public PORT: string;

    @envVar({ cast: toString, source, defaultValue: "development" })
    public NODE_ENV: string;
}

export default new Config();
