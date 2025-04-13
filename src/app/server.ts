import App from "./app";
import Database from "./database";
import env from "../configs/env.config";
import logger from "../utils/logger";

class Server {
  private readonly app: App;
  private readonly port: number;
  private readonly environment: string;
  private readonly database: Database;

  public constructor() {
    this.app = new App();
    this.port = env.port;
    this.environment = env.environment;
    this.database = new Database();
  }

  public start(): void {
    try {
      this.app.express.listen(this.port, () => {
        logger.info(
          `Server running on port ${this.port} in ${this.environment} mode`
        );
      });
    } catch (error) {
      logger.error(`Error starting server: ${error}`);
      process.exit(1);
    }
  }
}

new Server().start();
