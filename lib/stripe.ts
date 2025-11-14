import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  console.warn(
    "Stripe: STRIPE_SECRET_KEY não está definido. Funcionalidades de pagamento estão desativadas."
  )
}

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-10-29.clover",
      typescript: true,
    })
  : null

export const getStripeSession = async (customerId: string) => {
  if (!stripe) {
    throw new Error(
      "Stripe client não configurado (STRIPE_SECRET_KEY ausente)."
    )
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
  })

  return session
}
