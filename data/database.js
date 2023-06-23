import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then(() => console.log("database connected"))
    .catch((e) => console.log(e));
};
