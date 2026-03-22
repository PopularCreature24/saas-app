import { NextResponse } from 'next/server';
import { stripe, getTierFromPriceId } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        
        if (userId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          
          const periodEnd = subscription as unknown as { current_period_end: number };
          
          await prisma.subscription.update({
            where: { userId },
            data: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0]?.price.id,
              stripeCurrentPeriodEnd: new Date(periodEnd.current_period_end * 1000),
              status: 'ACTIVE',
              tier: getTierFromPriceId(subscription.items.data[0]?.price.id),
            },
          });
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        
        const dbSubscription = await prisma.subscription.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (dbSubscription) {
          const priceId = subscription.items.data[0]?.price.id;
          const periodEnd = subscription as unknown as { current_period_end: number };
          
          await prisma.subscription.update({
            where: { stripeCustomerId: customerId },
            data: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
              stripeCurrentPeriodEnd: new Date(periodEnd.current_period_end * 1000),
              status: subscription.status === 'active' ? 'ACTIVE' : 
                     subscription.status === 'past_due' ? 'PAST_DUE' :
                     subscription.status === 'canceled' ? 'CANCELLED' : 'INACTIVE',
              tier: getTierFromPriceId(priceId),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          });
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        
        await prisma.subscription.update({
          where: { stripeCustomerId: customerId },
          data: {
            status: 'CANCELLED',
            tier: 'FREE',
            stripeSubscriptionId: null,
            stripePriceId: null,
          },
        });
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        
        const dbSubscription = await prisma.subscription.findUnique({
          where: { stripeCustomerId: customerId },
        });

        if (dbSubscription && dbSubscription.stripeSubscriptionId) {
          const stripeSub = await stripe.subscriptions.retrieve(
            dbSubscription.stripeSubscriptionId
          );
          
          const periodEnd = stripeSub as unknown as { current_period_end: number };
          
          await prisma.subscription.update({
            where: { stripeCustomerId: customerId },
            data: {
              stripeCurrentPeriodEnd: new Date(periodEnd.current_period_end * 1000),
              status: 'ACTIVE',
            },
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        
        await prisma.subscription.update({
          where: { stripeCustomerId: customerId },
          data: {
            status: 'PAST_DUE',
          },
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
