import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle, Briefcase, Users } from "lucide-react"

export default function ParaEmpresasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Encontre o profissional certo para sua empresa
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Publique vagas de forma simples e alcance candidatos qualificados. Pague apenas por vaga publicada:
            <span className="font-semibold text-blue-700"> R$ 49,90 por vaga</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/registro?role=company">
              <Button size="lg">Criar conta para empresa</Button>
            </Link>
            <Link href="/vagas">
              <Button size="lg" variant="outline">Ver como as vagas aparecem</Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                Destaque sua vaga
              </CardTitle>
              <CardDescription>
                Título, descrição completa, requisitos e benefícios em um layout pensado para conversão.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Candidatos qualificados
              </CardTitle>
              <CardDescription>
                Receba candidaturas organizadas, com dados completos do candidato e histórico de experiência.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestão simples</CardTitle>
              <CardDescription>
                Acompanhe vagas e candidaturas em um painel único, sem complicação.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Como funciona a cobrança?
              </CardTitle>
              <CardDescription>
                Modelo transparente e previsível para empresas de qualquer porte.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <span className="font-semibold">R$ 49,90 por vaga publicada</span>: você paga apenas quando realmente precisa anunciar.
                </li>
                <li>
                  Sem mensalidade fixa para empresas – controle total do seu orçamento.
                </li>
                <li>
                  Anúncios focados em candidatos da sua região e segmento.
                </li>
              </ul>
              <p className="mt-4">
                Em versões futuras podemos integrar o pagamento on-line diretamente na publicação da vaga.
                Por enquanto, este valor já é o modelo de referência para seu negócio.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
