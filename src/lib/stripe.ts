import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover',
  typescript: true,
});

export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    interval: 'month' as const,
    features: [
      '3 project slots',
      'Basic 3D viewer',
      '720p exports',
      'Community support',
      '1GB storage',
    ],
    tier: 'free' as const,
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individual creators',
    price: 12,
    interval: 'month' as const,
    features: [
      '15 project slots',
      'Advanced 3D viewer',
      '1080p exports',
      'Email support',
      '10GB storage',
      'Custom branding',
    ],
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID,
    tier: 'starter' as const,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and teams',
    price: 29,
    interval: 'month' as const,
    features: [
      'Unlimited projects',
      'Premium 3D effects',
      '4K exports',
      'Priority support',
      '100GB storage',
      'Custom branding',
      'API access',
      'Analytics dashboard',
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
    tier: 'pro' as const,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 99,
    interval: 'month' as const,
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'SSO/SAML',
      'Dedicated support',
      'Custom contracts',
      'SLA guarantee',
      'White-label option',
      'On-premise option',
    ],
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    tier: 'enterprise' as const,
  },
];

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  userId: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
    metadata: {
      userId,
    },
  });

  return session;
}

export async function createCustomer(email: string, name: string) {
  return stripe.customers.create({
    email,
    name,
  });
}

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.cancel(subscriptionId);
}

export async function createPortalSession(customerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });
}
