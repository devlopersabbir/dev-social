import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    fullname: v.string(),
    username: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      ...args,
      posts: 0,
      followers: 0,
      following: 0,
    });
  },
});
