import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { priceId, plan } = body

    // Check if user already has a subscription
    let subscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id },
    })

    let customerId: string

    if (subscription) {
      customerId = subscription.stripeCustomerId
    } else {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: session.user.email || undefined,
        metadata: {
          userId: session.user.id!,
        },
      })

      customerId = customer.id

      // Create subscription record
      await prisma.subscription.create({
        data: {
          userId: session.user.id,
          stripeCustomerId: customerId,
          plan,
          status: "INCOMPLETE",
        },
      })
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId || undefined,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/assinatura?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/assinatura?canceled=true`,
      metadata: {
        userId: session.user.id!,
        plan,
      },
    })

    return NextResponse.json({ sessionId: checkoutSession.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      { error: "Erro ao criar sessão de pagamento" },
      { status: 500 }
    )
  }
}
