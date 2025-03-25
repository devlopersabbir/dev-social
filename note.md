<!-- schema.ts -->

import { defineSchema } from "convex/server";
import \* as schema from "./schemas";

export default defineSchema({
users: schema.users,
posts: schema.posts,
likes: schema.likes,
comments: schema.comments,
follows: schema.follows,
notifications: schema.notifications,
bookmarks: schema.bookmarks,
});

<!-- http.ts -->

import { httpRouter } from "convex/server";
import { httpAction } from "./\_generated/server";
import { Webhook } from "svix";
import { api } from "./\_generated/api";

const http = httpRouter();

http.route({
path: "/clerk-webhook",
method: "POST",
handler: httpAction(async (ctx, request) => {
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
if (!webhookSecret) throw new Error("Missing env of web hook");

    // check header
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp)
      return new Response("Error - no svix header", {
        status: 400,
      });

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: any;

    // verify web hook
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as any;
    } catch (err) {
      console.error("error veryfy hoo", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_address, first_name, last_name, image_url } = evt.data;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.createUser, {
          email,
          fullname: name,
          image: image_url,
          clerkId: id,
          username: email_address?.split("@")[0],
        });
      } catch (err) {
        console.log("Error creating a user", err);
        return new Response("Error creating a user", {
          status: 500,
        });
      }
    }
    return new Response("webhook processed successfully", {
      status: 200,
    });

}),
});

export default http;

<!-- auth.config.ts -->

export default {
providers: [
{
domain: "https://amazing-gopher-31.clerk.accounts.dev",
applicationID: "convex",
},
],
};
