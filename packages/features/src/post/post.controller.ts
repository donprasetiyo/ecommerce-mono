import { Injectable } from "@nestjs/common";

import type { CreatePost } from "@repo/validators";
import { Logger, LoggerFactory } from "@repo/logging";

import { PostService } from "./post.service";
import { User } from "@repo/trpc";

@Injectable()
export class PostController {
  private readonly logger: Logger = LoggerFactory.getLogger("PostController");

  constructor(private readonly postService: PostService) {}

  public getAll() {
    try {
      return this.postService.getAll();
    } catch (error) {
      this.logger.error(error, "Unable to get all the posts");
      throw error;
    }
  }

  public getById(id: number) {
    try {
      return this.postService.getById(id);
    } catch (error) {
      this.logger.error(error, "Unable to get the post by ID");
      throw error;
    }
  }

  public create(input: CreatePost) {
    try {
      return this.postService.create(input);
    } catch (error) {
      this.logger.error(error, "Unable to create a post with given inputs");
      throw error;
    }
  }

  public deleteById(id: number, user: Partial<User>) {
    try {
      return this.postService.deleteById(id, user);
    } catch (error) {
      this.logger.error(error, "Unable to delete the post by ID");
      throw error;
    }
  }
}
