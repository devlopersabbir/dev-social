// import { v } from "convex/values";
// import { mutation } from "../_generated/server";

// export const createUser = mutation({
//   args: {
//     username: v.string(),
//     fullname: v.string(),
//     email: v.string(),
//     bio: v.optional(v.string()),
//     image: v.string(),
//     clerkId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const isUser = await ctx.db
//       .query("users")
//       .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId));
//     if (isUser) return;
//     await ctx.db.insert("users", {
//       ...args,
//       posts: 0,
//       followers: 0,
//       following: 0,
//     });
//   },
// });
