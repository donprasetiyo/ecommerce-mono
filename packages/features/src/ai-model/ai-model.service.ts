import { Injectable } from "@nestjs/common";
import { Logger, LoggerFactory } from "@repo/logging";
import { AIModelRepository } from "./ai-model.repository";

@Injectable()
export class AIModelService {
    private readonly logger: Logger = LoggerFactory.getLogger("AIModelService");
    constructor(private readonly aiModelRepository: AIModelRepository) { }

    public getAll() {
        this.logger.info("getAll() called");
        return this.aiModelRepository.getAll();
    }

    public add(icon: string, name: string, label: string, price_based_on: 'TIME' | 'TOKEN', public_name: string, source: string) {
        this.logger.info("create() called");
        return this.aiModelRepository.add(
            icon,
            name,
            label,
            price_based_on,
            public_name,
            source,
        );
    }
}
