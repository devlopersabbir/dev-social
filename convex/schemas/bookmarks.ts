import { defineTable } from "convex/server";
import { v } from "convex/values";

export const bookmarks = defineTable({
  userId: v.id("users"),
  postId: v.id("postId"),
})
  .index("by_user", ["userId"])
  .index("by_post", ["postId"])
  .index("by_user_and_post", ["userId", "postId"]);
