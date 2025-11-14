import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle, Search, MapPin } from "lucide-react"

export default function ParaContratarServicosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Encontre prestadores de serviço de confiança
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Busque profissionais para limpeza, reforma, eventos, manutenção e muito mais. Para quem
            contrata, o uso da plataforma é <span className="font-semibold text-green-700">100% gratuito</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/servicos">
              <Button size="lg">Ver profissionais disponíveis</Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Busca por categoria
              </CardTitle>
              <CardDescription>
                Encontre rapidamente profissionais por tipo de serviço, como pedreiro, faxineira, garçom e mais.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Perto de você
              </CardTitle>
              <CardDescription>
                Veja localização, disponibilidade e avaliações antes de solicitar o serviço.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sem taxas para contratar</CardTitle>
              <CardDescription>
                Você não paga nada para usar a plataforma. Negocia diretamente com o profissional.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Como o Sine Santa Maria ajuda você
              </CardTitle>
              <CardDescription>
                Mais organização e segurança na contratação de mão de obra especializada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
              <ul className="space-y-2 list-disc list-inside">
                <li>Profissionais com perfil detalhado, avaliações e histórico de trabalhos.</li>
                <li>Comunicação direta para combinar preço, data e forma de pagamento.</li>
                <li>Sem mensalidade ou taxa de uso para quem está contratando.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
