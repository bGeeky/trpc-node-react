import { TRPCError } from "@trpc/server";
import { CreatePostInput } from "../schema/post.schema";
import { createPost, findAllPosts } from "../services/post.service";

export const createPostHandler = async ({
  input,
}: {
  input: CreatePostInput;
}) => {
  try {
    const post = await createPost(input);

    return {
      status: "success",
      data: {
        post,
      },
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Post with that title already exists",
      });
    }
    throw err;
  }
};

export const getPostsHandler = async () => {
  try {
    const posts = await findAllPosts();

    return {
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};