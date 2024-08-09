import { Module } from "@nestjs/common";

import { AIModelController } from "./ai-model.controller";
import { AIModelRouter } from "./ai-model.router";
import { AIModelService } from "./ai-model.service";
import { AIModelRepository } from "./ai-model.repository";
import { PostgresClient } from "@repo/database";

@Module({
  imports: [],
  controllers: [],
  providers: [AIModelRouter, AIModelController, AIModelService, AIModelRepository, PostgresClient],
  exports: [AIModelRouter],
})
export class AIModelModule {}
