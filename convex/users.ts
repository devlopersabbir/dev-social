import { v } from "convex/values";
import { mutation, MutationCtx, QueryCtx } from "./_generated/server";

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

export const getAuthenticateUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorize");

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();

  if (!user) throw new Error("User not found!");
  return user;
};
