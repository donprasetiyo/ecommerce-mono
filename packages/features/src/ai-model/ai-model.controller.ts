import { Injectable } from "@nestjs/common";
import { Logger, LoggerFactory } from "@repo/logging";
import { AIModelService } from "./ai-model.service";

@Injectable()
export class AIModelController {
  private readonly logger: Logger = LoggerFactory.getLogger("CurrencyController");

  constructor(private readonly aiModelService: AIModelService) { }

  public getAll() {
    try {
      return this.aiModelService.getAll();
    } catch (error) {
      this.logger.error(error, "Unable to get all the aiModel");
      throw error;
    }
  }

  public add(icon: string, name: string, label: string, price_based_on: 'TIME' | 'TOKEN', public_name: string, source: string) {
    try {
      return this.aiModelService.add(
        icon,
        name,
        label,
        price_based_on,
        public_name,
        source,
      );
    } catch (error) {
      this.logger.error(error, "Unable to create a aiModel with given inputs");
      throw error;
    }
  }

}
