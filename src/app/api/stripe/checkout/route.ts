import { NextResponse } from 'next/server';
import { stripe, createCheckoutSession, createCustomer } from '@/lib/stripe';
import { useAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();
    
    const customer = await createCustomer('customer@example.com', 'Customer Name');
    
    const session = await createCheckoutSession(
      customer.id,
      priceId,
      'user_id'
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
