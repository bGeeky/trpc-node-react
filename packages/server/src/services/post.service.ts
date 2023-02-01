import Post, { IPost } from "../models/Post";
import { CreatePostInput } from "../schema/post.schema";

export const createPost = async (input: CreatePostInput) => {
  const post: IPost = await Post.create(input);
  return post;
};

export const findAllPosts = async () => {
  const allPosts = await Post.find({});
  return allPosts;
};
