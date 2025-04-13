import mongoose from "mongoose";

import env from "../configs/env.config";
import logger from "../utils/logger";

class Database {
  public constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    const uri = env.db;
    const name = env.dbName;

    if (!uri || !name) {
      logger.error(`Missing uri and database name in environment variables`);
      process.exit(1);
    }

    try {
      await mongoose.connect(`${uri}/${name}`);
      logger.info(`Database connected successfully`);
    } catch (error) {
      logger.error(`Database connected failed: ${error}`);
      process.exit(1);
    }
  }
}

export default Database;
