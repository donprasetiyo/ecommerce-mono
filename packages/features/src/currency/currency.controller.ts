import { Injectable } from "@nestjs/common";
import { Logger, LoggerFactory } from "@repo/logging";
import { CurrencyService } from "./currency.service";

@Injectable()
export class CurrencyController {
  private readonly logger: Logger = LoggerFactory.getLogger("PostController");

  constructor(private readonly currencyService: CurrencyService) {}

  public getAll() {
    try {
      return this.currencyService.getAll();
    } catch (error) {
      this.logger.error(error, "Unable to get all the currency");
      throw error;
    }
  }

  public create(code: string, name: string) {
    try {
      return this.currencyService.create(code, name);
    } catch (error) {
      this.logger.error(error, "Unable to create a currency with given inputs");
      throw error;
    }
  }

}
