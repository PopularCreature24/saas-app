import { PricingCard } from '@/components/pricing/pricing-card';
import { PLANS } from '@/lib/stripe';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container px-4">
        <div className="mb-8 md:mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto text-base sm:text-lg">
            Choose the plan that fits your needs. Start free, upgrade anytime. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} popular={plan.id === 'pro'} />
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mt-6 md:mt-8 text-left">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, including Visa, Mastercard, and American Express.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes! All paid plans come with a 14-day free trial. No credit card required.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Absolutely. Cancel anytime from your dashboard. No questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
