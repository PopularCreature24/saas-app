import { NextResponse } from 'next/server';
import { stripe, createPortalSession } from '@/lib/stripe';

export async function POST() {
  try {
    const session = await createPortalSession('customer_id');
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
