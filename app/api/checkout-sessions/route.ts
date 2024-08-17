import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: '2022-11-15',
})

const formatAmountForStripe = (amount: number, currency: string) => {
  return Math.round(amount * 100)
}

async function createCheckoutSession(req: Request) {
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Pro subscription',
          },
          unit_amount: formatAmountForStripe(10, 'usd'), // $10.00
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      'Referer',
    )}result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      'Referer',
    )}result?session_id={CHECKOUT_SESSION_ID}`,
  }

  return await stripe.checkout.sessions.create(params)
}

export async function POST(req: Request) {
  try {
    /*
    // Create a new checkout session
    const checkoutSession = await createCheckoutSession(req)
    return NextResponse.json(checkoutSession, { status: 200 })
    */
    return NextResponse.json({ error: { message: 'Unavailable' } }, { status: 400 })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: (error as Error).message } }), {
      status: 500,
    })
  }
}
