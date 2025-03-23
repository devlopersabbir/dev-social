import { defineTable } from "convex/server";
import { v } from "convex/values";

export const likes = defineTable({
  userId: v.id("users"),
  postId: v.id("posts"),
})
  .index("by_post", ["postId"])
  .index("by_user_and_post", ["userId", "postId"]);
