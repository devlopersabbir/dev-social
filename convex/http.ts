import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

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
    console.log(body);

    // const wh = new Svix(webhookSecret);
    let evt: any;
    console.log("request body: ", body);

    return new Response("webhook processed successfully", {
      status: 200,
    });
  }),
});

export default http;
