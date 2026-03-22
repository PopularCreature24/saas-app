'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatPrice } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { PricingPlan } from '@/types';

interface PricingCardProps {
  plan: PricingPlan;
  popular?: boolean;
  currentPlan?: boolean;
}

export function PricingCard({ plan, popular, currentPlan }: PricingCardProps) {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const handleSelectPlan = async () => {
    if (!user) {
      router.push('/auth/register');
      return;
    }

    if (plan.tier === 'free') {
      updateUser({ subscriptionTier: 'free' });
      return;
    }

    if (plan.stripePriceId) {
      try {
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ priceId: plan.stripePriceId }),
        });
        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        console.error('Failed to create checkout session:', error);
      }
    }
  };

  return (
    <Card
      className={cn(
        'relative flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        popular && 'border-violet-500 shadow-lg shadow-violet-500/20'
      )}
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Most Popular
        </Badge>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
          <span className="text-muted-foreground">/{plan.interval}</span>
        </div>

        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 text-violet-500 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className={cn(
            'w-full',
            popular && 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90'
          )}
          variant={popular ? 'default' : 'outline'}
          onClick={handleSelectPlan}
          disabled={currentPlan}
        >
          {currentPlan ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Subscribe'}
        </Button>
      </CardFooter>
    </Card>
  );
}
