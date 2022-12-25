import mongoose from "mongoose";
import dotenv from "dotenv-defaults";

const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
require("dotenv-defaults").config();
//console.log(process.env.MONGO_URL);
//dotenv.config();
export default {
  connect: () => {
    /* code to connect Mongoose DB */
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log("mongo db connection created"));
  },
};
