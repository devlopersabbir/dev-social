export default {
  providers: [
    {
      domain: process.env.EXPO_PUBLIC_CLERK_ISSUE!,
      applicationID: "convex",
    },
  ],
};
