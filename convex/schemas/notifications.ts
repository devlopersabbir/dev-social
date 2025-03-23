import { defineTable } from "convex/server";
import { v } from "convex/values";

export const notifications = defineTable({
  receiverId: v.id("users"),
  senderId: v.id("posts"),
  type: v.union(
    v.literal("like"),
    v.literal("comment"),
    v.literal("follow"),
    v.literal("message")
  ),
  postId: v.optional(v.id("posts")),
  commentId: v.optional(v.id("comments")),
}).index("by_receiver", ["receiverId"]);
