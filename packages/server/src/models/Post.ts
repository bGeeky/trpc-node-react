import { Document, model, Schema } from "mongoose";

export type TPost = {
  title: string;
  content: string;
  author: string;
};

export interface IPost extends TPost, Document {}

const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = model<IPost>("Post", PostSchema);

export default Post;
