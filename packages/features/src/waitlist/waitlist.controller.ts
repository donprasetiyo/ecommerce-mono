import { Injectable } from "@nestjs/common";
import { Logger, LoggerFactory } from "@repo/logging";
import { WaitlistService } from "./waitlist.service";
import { Insertable } from "kysely";
import { WaitingListUser } from "@repo/shared-types";

@Injectable()
export class WaitlistController {
  private readonly logger: Logger = LoggerFactory.getLogger("CurrencyController");

  constructor(private readonly waitlistService: WaitlistService) { }

  public getAll() {
    try {
      return this.waitlistService.getAll();
    } catch (error) {
      this.logger.error(error, "Unable to get all the waitlist");
      throw error;
    }
  }

  public add(newWaitListUser: Insertable<WaitingListUser>) {
    try {
      return this.waitlistService.add(
       newWaitListUser
      );
    } catch (error) {
      this.logger.error(error, "Unable to create a waitlist with given inputs");
      throw error;
    }
  }

}
