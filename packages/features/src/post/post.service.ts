import { Injectable } from "@nestjs/common";

import type { CreatePost } from "@repo/validators";
import { Logger, LoggerFactory } from "@repo/logging";
import { User } from "@repo/trpc";

type Post = {
  id: number;
  title: string;
  content: string;
};

let posts = [
  {
    id: 1,
    title: "test title 1",
    content: "test content 1",
  },
  {
    id: 2,
    title: "test title 2",
    content: "test content 2",
  },
  {
    id: 3,
    title: "test title 3",
    content: "test content 3",
  },
];

@Injectable()
export class PostService {
  private readonly logger: Logger = LoggerFactory.getLogger("PostService");

  public getAll() {
    this.logger.info("getAll() called");
    return posts;
  }

  public getById(id: number) {
    this.logger.info("getById() called");
    return posts.find((p) => p.id === id);
  }

  public create(input: CreatePost) {
    this.logger.info("create() called");
    const id = (posts[posts.length - 1]?.id || 0) + 1;
    posts.push({ id, ...input });
    return id;
  }

  public deleteById(id: number, user: Partial<User>) {
    this.logger.info("deleteById() called");
    for (let i = posts.length - 1; i >= 0; --i) {
      const post = posts[i];
      if (post && post.id == id) {
        const deletedPost = posts.splice(i, 1);
        this.logger.info("Post deleted", deletedPost[0]);
        return deletedPost[0];
      }
    }
    return null;
  }
}
