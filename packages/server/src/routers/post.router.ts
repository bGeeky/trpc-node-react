import { createPostSchema } from "../schema/post.schema";
import {
  createPostHandler,
  getPostsHandler,
} from "../controllers/post.controller";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "../createContext";
export type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const postRouter = t.router({
  createPost: t.procedure
    .input(createPostSchema)
    .mutation(({ input }) => createPostHandler({ input })),
  getPosts: t.procedure.query(() => getPostsHandler()),
});

export default postRouter;
