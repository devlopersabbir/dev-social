import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticateUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorize");

  return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: {
    storageId: v.id("_storage"),
    caption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getAuthenticateUser(ctx);
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (!imageUrl) throw new Error("Image not found!");

    const post = await ctx.db.insert("posts", {
      ...args,
      userId: user._id,
      imageUrl,
      likes: 0,
      comments: 0,
    });
    // increment user number of post
    await ctx.db.patch(user._id, {
      posts: user.posts + 1,
    });

    return post;
  },
});

export const getFeedPosts = query({
  handler: async (ctx, args) => {
    const user = await getAuthenticateUser(ctx);

    // get all posts

    const posts = await ctx.db.query("posts").order("desc").collect();

    if (posts.length === 0) return [];

    await Promise.all(
      posts.map(async (post) => {
        const postAuthor = await ctx.db.get(post.userId);
        const like = await ctx.db
          .query("likes")
          .withIndex("by_user_and_post", (q) =>
            q.eq("userId", user._id).eq("postId", post._id)
          )
          .first();
        const bookMark = await ctx.db
          .query("bookmarks")
          .withIndex("by_user_and_post", (q) =>
            q.eq("userId", user._id).eq("postId", post._id)
          )
          .first();
        return {
          ...post,
          author: {
            _id: postAuthor?._id,
            username: postAuthor?.username,
            image: postAuthor?.image,
          },
          isLiked: !!like,
          isBookMarked: !!bookMark,
        };
      })
    );
  },
});
