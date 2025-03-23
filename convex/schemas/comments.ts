import { defineTable } from "convex/server";
import { v } from "convex/values";

export const comments = defineTable({
  userId: v.id("users"),
  postId: v.id("posts"),
  content: v.string(),
}).index("by_post", ["postId"]);
