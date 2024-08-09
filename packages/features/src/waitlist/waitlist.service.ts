import { Injectable } from "@nestjs/common";
import { Logger, LoggerFactory } from "@repo/logging";
import { WaitlistRepository } from "./waitlist.repository";
import { Insertable } from "kysely";
import { WaitingListUser } from "@repo/shared-types";

@Injectable()
export class WaitlistService {
    private readonly logger: Logger = LoggerFactory.getLogger("WaitlistService");
    constructor(private readonly waitlistRepository: WaitlistRepository) { }

    public getAll() {
        this.logger.info("getAll() called");
        return this.waitlistRepository.getAll();
    }

    public add(newWaitListUser: Insertable<WaitingListUser>) {
        this.logger.info("create() called");
        return this.waitlistRepository.add(
          newWaitListUser
        );
    }
}
