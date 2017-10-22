import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

(<any>mongoose).Promise = bluebird;


export let connect = (connectUrl: string, username: string, password: string) => {

  /**
   * Connect to MongoDB.
   */
  // mongoose.Promise = global.Promise;
  mongoose.connect(connectUrl);

  mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
  });

};