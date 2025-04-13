import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";
import chalk from "chalk";
import path from "path";
import fs from "fs";

import env from "../configs/env.config";
import { error } from "console";

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

class Logger {
  private logger: WinstonLogger;
  private levelsColor: Record<string, (msg: string) => string> = {
    info: chalk.blueBright,
    warn: chalk.yellowBright,
    error: chalk.redBright,
    debug: chalk.magentaBright,
  };

  public constructor() {
    this.logger = createLogger({
      level: env.environment === "production" ? "debug" : "info",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(({ timestamp, level, message }) => {
          const color = this.levelsColor[level] || chalk.white;
          return `${chalk.gray(`[${timestamp}]`)} ${color(
            level.toUpperCase()
          )}: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: path.join(logDir, "error.log"),
          level: "error",
        }),
        new transports.File({
          filename: path.join(logDir, "combined.log"),
        }),
      ],
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }
  public error(message: string): void {
    this.logger.error(message);
  }
  public debug(message: string): void {
    this.logger.debug(message);
  }
}

export default new Logger();
