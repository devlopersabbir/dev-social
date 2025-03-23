import { defineTable } from "convex/server";
import { v } from "convex/values";

export const posts = defineTable({
  userId: v.id("users"),
  imageUrl: v.string(),
  storageId: v.id("_storage"),
  caption: v.optional(v.string()),
  likes: v.number(),
  comments: v.number(),
}).index("by_user", ["userId"]);
