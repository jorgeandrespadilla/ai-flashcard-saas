import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: '2022-11-15',
})

export async function POST(req: Request) {
  try {
    return NextResponse.json({ error: { message: 'Unavailable' } }, { status: 400 })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: (error as Error).message } }), {
      status: 500,
    })
  }
}
