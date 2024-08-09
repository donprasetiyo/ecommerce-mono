import { Injectable } from "@nestjs/common";

import { Logger, LoggerFactory } from "@repo/logging";
import { CurrencyRepository } from "./currency.repository";

@Injectable()
export class CurrencyService {
    private readonly logger: Logger = LoggerFactory.getLogger("CurrencyService");
    constructor(private readonly currencyRepository: CurrencyRepository) {}

    public getAll() {
        this.logger.info("getAll() called");
        return this.currencyRepository.getAll();
    }

    public create(code: string, name: string) {
        this.logger.info("create() called");
        return this.currencyRepository.create(
            code,
            name
        );
    }
}
