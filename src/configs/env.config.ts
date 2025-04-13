import dotenv from "dotenv";
import path from "path";

class EnvConfig {
  public readonly port: number;
  public readonly environment: string;
  public readonly origin: string;
  public readonly basePath: string;
  public readonly db: string;
  public readonly dbName: string;
  public readonly secret: string;
  public readonly expiresIn: number;

  public constructor() {
    this.loadEnv();
    this.port = parseInt(this.getEnv("PORT", "9800"), 10);
    this.environment = this.getEnv("NODE_ENV", "development");
    this.origin = this.getEnv("APP_ORIGIN");
    this.basePath = this.getEnv("BASE_PATH");
    this.db = this.getEnv("MONGO_URI");
    this.dbName = this.getEnv("MONGO_DB_NAME");
    this.secret = this.getEnv("JWT_SECRET");
    this.expiresIn = parseInt(this.getEnv("JWT_EXPIRES_IN"));
  }

  // To load .env file
  private loadEnv(): void {
    dotenv.config({
      path: path.resolve(process.cwd(), ".env.local"),
    });
  }

  // To Get Environment Value from .env file
  private getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (!value && !defaultValue) {
      throw new Error(`Missing environment variables: ${key}`);
    }
    return value || defaultValue!;
  }
}

const env = new EnvConfig();

export default env;
