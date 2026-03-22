export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  subscriptionTier: 'free' | 'starter' | 'pro' | 'enterprise';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId?: string;
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  modelUrl?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}
