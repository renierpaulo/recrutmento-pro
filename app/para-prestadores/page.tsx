import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle, Hammer, Star } from "lucide-react"

export default function ParaPrestadoresPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Anuncie seus serviços e receba mais clientes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tenha um perfil profissional dentro do Sine Santa Maria, apareça nas buscas e receba solicitações
            de novos clientes por apenas <span className="font-semibold text-blue-700">R$ 9,90 por mês</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/servicos/cadastrar">
              <Button size="lg">Cadastrar-se como profissional</Button>
            </Link>
            <Link href="/servicos">
              <Button size="lg" variant="outline">Ver profissionais em destaque</Button>
            </Link>
            <Link href="/assinatura">
              <Button size="lg" variant="ghost">Assinar plano de prestador</Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hammer className="h-5 w-5 text-blue-600" />
                Perfil profissional completo
              </CardTitle>
              <CardDescription>
                Mostre suas especialidades, fotos de trabalhos, certificações e experiências.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Destaque nas buscas
              </CardTitle>
              <CardDescription>
                Apareça para clientes que procuram exatamente o tipo de serviço que você oferece.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Canal direto com o cliente</CardTitle>
              <CardDescription>
                Receba solicitações com detalhes do serviço e combine diretamente com o contratante.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Condições do plano de prestador
              </CardTitle>
              <CardDescription>
                Simples, acessível e pensado para quem quer manter uma presença fixa na plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
              <ul className="space-y-2 list-disc list-inside">
                <li><span className="font-semibold">R$ 9,90 / mês</span> para manter seu perfil visível na plataforma.</li>
                <li>Sem taxa por lead ou percentual sobre o serviço – o valor combinado é entre você e o cliente.</li>
                <li>Você pode cancelar a qualquer momento.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
