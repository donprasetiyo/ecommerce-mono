import { Module } from "@nestjs/common";

import { WaitlistController } from "./waitlist.controller";
import { WaitlistRouter } from "./waitlist.router";
import { WaitlistService } from "./waitlist.service";
import { WaitlistRepository } from "./waitlist.repository";
import { PostgresClient } from "@repo/database";

@Module({
  imports: [],
  controllers: [],
  providers: [WaitlistRouter, WaitlistController, WaitlistService, WaitlistRepository, PostgresClient],
  exports: [WaitlistRouter],
})
export class WaitlistModule {}
