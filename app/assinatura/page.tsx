"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Crown } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "R$ 29",
    priceId: "price_basic", // Substituir com ID real do Stripe
    plan: "basic",
    description: "Para candidatos iniciantes",
    features: [
      "Até 10 candidaturas/mês",
      "Perfil básico",
      "Alertas de vagas",
      "Suporte por email",
    ],
  },
  {
    name: "Profissional",
    price: "R$ 99",
    priceId: "price_professional", // Substituir com ID real do Stripe
    plan: "professional",
    description: "Para empresas em crescimento",
    features: [
      "Candidaturas ilimitadas",
      "Até 5 vagas ativas",
      "Destaque no perfil",
      "Analytics básico",
      "Suporte prioritário",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "R$ 299",
    priceId: "price_enterprise", // Substituir com ID real do Stripe
    plan: "enterprise",
    description: "Para grandes empresas",
    features: [
      "Vagas ilimitadas",
      "Prioridade na busca",
      "Analytics avançado",
      "API access",
      "Suporte dedicado",
      "Treinamento personalizado",
    ],
  },
]

export default function SubscriptionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const handleSubscribe = async (priceId: string, plan: string) => {
    setLoading(priceId)

    try {
      const response = await fetch("/api/subscription/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, plan }),
      })

      const data = await response.json()

      if (data.sessionId) {
        // Redirect to Stripe Checkout
        // In production, use Stripe.js redirectToCheckout
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Erro ao processar assinatura")
    } finally {
      setLoading(null)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-600">
            Selecione o plano ideal para suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.plan}
              className={plan.popular ? "border-blue-600 border-2 relative" : ""}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Crown className="h-4 w-4" />
                    Mais Popular
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.priceId, plan.plan)}
                  disabled={loading === plan.priceId}
                >
                  {loading === plan.priceId ? "Processando..." : "Assinar Agora"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>
            Todos os planos incluem período de teste de 7 dias. 
            Cancele a qualquer momento sem custos adicionais.
          </p>
        </div>
      </div>
    </div>
  )
}
