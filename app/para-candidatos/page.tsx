import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ParaCandidatosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Encontre o emprego certo para você
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crie seu perfil, busque vagas em diversas áreas e candidate-se quantas vezes quiser.
            Tudo isso de forma totalmente <span className="font-semibold text-green-700">gratuita</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/registro?role=candidate">
              <Button size="lg">Criar conta gratuita</Button>
            </Link>
            <Link href="/vagas">
              <Button size="lg" variant="outline">Ver vagas abertas</Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Busca de vagas</CardTitle>
              <CardDescription>
                Filtre vagas por área, localidade, tipo de contrato e nível de experiência.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfil profissional completo</CardTitle>
              <CardDescription>
                Cadastre experiências, formação, habilidades e portfólio para se destacar.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acompanhamento de candidaturas</CardTitle>
              <CardDescription>
                Veja o status de cada candidatura diretamente no seu painel.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Quanto custa para quem busca emprego?
              </CardTitle>
              <CardDescription>
                Para candidatos, o uso da plataforma é 100% gratuito. Você pode criar conta,
                montar seu perfil e se candidatar às vagas sem pagar nada.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Nosso foco é facilitar sua recolocação no mercado de trabalho. As empresas e prestadores
                é que pagam para anunciar, não você.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
