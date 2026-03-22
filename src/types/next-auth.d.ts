import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    subscriptionTier?: string;
    subscriptionStatus?: string;
    stripeCustomerId?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      subscriptionTier?: string;
      subscriptionStatus?: string;
      stripeCustomerId?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    subscriptionTier?: string;
    subscriptionStatus?: string;
    stripeCustomerId?: string;
  }
}
