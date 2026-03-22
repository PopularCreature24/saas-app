export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  subscriptionTier: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  tier: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId?: string;
  tier: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  modelUrl?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  views: number;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | 'PAST_DUE';
  tier: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}

export interface DashboardStats {
  totalProjects: number;
  totalViews: number;
  storageUsed: number;
  currentTier: string;
  projectsChange: number;
  viewsChange: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface ViewData {
  date: string;
  views: number;
  projects: number;
}

export type SubscriptionTier = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
export type SubscriptionStatus = 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | 'PAST_DUE';
