import { defineTable } from "convex/server";
import { v } from "convex/values";

export const follows = defineTable({
  followerId: v.id("users"),
  followingId: v.id("users"),
})
  .index("by_follower", ["followerId"])
  .index("by_following", ["followingId"])
  .index("by_both", ["followerId", "followingId"]);
