/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as http from "../http.js";
import type * as schemas_bookmarks from "../schemas/bookmarks.js";
import type * as schemas_comments from "../schemas/comments.js";
import type * as schemas_follows from "../schemas/follows.js";
import type * as schemas_index from "../schemas/index.js";
import type * as schemas_likes from "../schemas/likes.js";
import type * as schemas_notifications from "../schemas/notifications.js";
import type * as schemas_posts from "../schemas/posts.js";
import type * as schemas_users from "../schemas/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  http: typeof http;
  "schemas/bookmarks": typeof schemas_bookmarks;
  "schemas/comments": typeof schemas_comments;
  "schemas/follows": typeof schemas_follows;
  "schemas/index": typeof schemas_index;
  "schemas/likes": typeof schemas_likes;
  "schemas/notifications": typeof schemas_notifications;
  "schemas/posts": typeof schemas_posts;
  "schemas/users": typeof schemas_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
