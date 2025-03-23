import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
  username: v.string(),
  fullname: v.string(),
  email: v.string(),
  bio: v.optional(v.string()),
  image: v.string(),
  followers: v.number(),
  following: v.number(),
  posts: v.number(),
  clerkId: v.string(),
})
  .index("by_clerk_id", ["clerkId"])
  .searchIndex("by_username", {
    searchField: "username",
  });

export type User = typeof users;
