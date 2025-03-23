import { defineSchema } from "convex/server";
import * as schema from "./schemas";

export default defineSchema({
  users: schema.users,
  posts: schema.posts,
  likes: schema.likes,
  comments: schema.comments,
  follows: schema.follows,
  notifications: schema.notifications,
  bookmarks: schema.bookmarks,
});
