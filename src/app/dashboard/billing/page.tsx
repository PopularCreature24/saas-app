'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PLANS } from '@/lib/stripe';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Check, ExternalLink, Download } from 'lucide-react';

export default function BillingPage() {
  const { user } = useAuth();

  const currentPlan = PLANS.find(plan => plan.tier === user?.subscriptionTier) || PLANS[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
            <CardDescription>Your current subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{currentPlan.name}</p>
                <p className="text-muted-foreground">{currentPlan.description}</p>
              </div>
              <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
                Active
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">
                  {formatPrice(currentPlan.price)}/{currentPlan.interval}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Billing Cycle</span>
                <span className="font-medium">Monthly</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-medium">April 15, 2024</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <a href="/api/stripe/portal" className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-foreground w-full">
              <ExternalLink className="h-4 w-4" />
              Manage Subscription
            </a>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your saved payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-14 items-center justify-center rounded bg-muted">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
          <CardDescription>Compare features across all plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Feature</th>
                  {PLANS.map((plan) => (
                    <th key={plan.id} className="py-3 text-center font-medium">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Projects</td>
                  <td className="py-3 text-center">3</td>
                  <td className="py-3 text-center">15</td>
                  <td className="py-3 text-center">Unlimited</td>
                  <td className="py-3 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Storage</td>
                  <td className="py-3 text-center">1 GB</td>
                  <td className="py-3 text-center">10 GB</td>
                  <td className="py-3 text-center">100 GB</td>
                  <td className="py-3 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Export Quality</td>
                  <td className="py-3 text-center">720p</td>
                  <td className="py-3 text-center">1080p</td>
                  <td className="py-3 text-center">4K</td>
                  <td className="py-3 text-center">4K</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Custom Branding</td>
                  <td className="py-3 text-center">
                    <span className="text-muted-foreground">—</span>
                  </td>
                  <td className="py-3 text-center">
                    <Check className="mx-auto h-4 w-4 text-violet-500" />
                  </td>
                  <td className="py-3 text-center">
                    <Check className="mx-auto h-4 w-4 text-violet-500" />
                  </td>
                  <td className="py-3 text-center">
                    <Check className="mx-auto h-4 w-4 text-violet-500" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3">API Access</td>
                  <td className="py-3 text-center">
                    <span className="text-muted-foreground">—</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="text-muted-foreground">—</span>
                  </td>
                  <td className="py-3 text-center">
                    <Check className="mx-auto h-4 w-4 text-violet-500" />
                  </td>
                  <td className="py-3 text-center">
                    <Check className="mx-auto h-4 w-4 text-violet-500" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'Mar 15, 2024', amount: 29, status: 'Paid' },
              { date: 'Feb 15, 2024', amount: 29, status: 'Paid' },
              { date: 'Jan 15, 2024', amount: 29, status: 'Paid' },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-muted-foreground">Pro Plan</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{invoice.status}</Badge>
                  <span className="font-medium">{formatPrice(invoice.amount)}</span>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
