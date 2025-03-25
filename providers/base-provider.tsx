import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const BaseProvider = ({
  children,
  convex,
}: {
  children: ReactNode;
  convex: ConvexReactClient;
}) => {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
};
export default BaseProvider;
