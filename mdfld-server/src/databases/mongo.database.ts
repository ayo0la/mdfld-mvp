import mongoose from "mongoose";
import logger from "../utils/common/logger.util.js";

// Disabling strict mode for queries, mongoose will execute queries that contain undefined properties
mongoose.set("strictQuery", false);

/**
 * A utility class that provides a static method to connect to a MongoDB database using Mongoose.
 */
class MongoDBClient {
  /**
   * Establishes a connection to a MongoDB database using Mongoose.
   */
  static init() {
    const uri = process.env.DB_URI;
    mongoose
      .connect(uri as string)
      .then(() => {
        logger.info("Connected to DB");
      })
      .catch((err) => {
        logger.error(`${err}`);
      });
  }
}
export default MongoDBClient;
