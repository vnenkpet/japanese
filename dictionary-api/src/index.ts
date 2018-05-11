import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import app from "./server";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);
app.listen(3000);
