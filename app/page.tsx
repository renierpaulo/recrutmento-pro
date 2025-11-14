import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Briefcase, Users, TrendingUp, CheckCircle, Hammer, Sparkles, Utensils, Wrench, Paintbrush, Home as HomeIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Sine Santa Maria - Conectando Pessoas e Oportunidades
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              A plataforma completa de recrutamento e contratação de mão de obra especializada.
              Encontre a vaga ideal, o candidato perfeito ou contrate profissionais especializados.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/registro?role=candidate">
                <Button size="lg" variant="secondary">
                  Sou Candidato
                </Button>
              </Link>
              <Link href="/registro?role=company">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                  Sou Empresa
                </Button>
              </Link>
              <Link href="/servicos">
                <Button size="lg" variant="secondary">
                  Contratar Mão de Obra
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o Sine Santa Maria?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece as melhores ferramentas para conectar talentos, empresas e serviços especializados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Briefcase className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Vagas Qualificadas</CardTitle>
                <CardDescription>
                  Acesso a milhares de oportunidades de empresas verificadas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Candidatos Qualificados</CardTitle>
                <CardDescription>
                  Encontre profissionais qualificados para sua empresa
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Sistema de Assinaturas</CardTitle>
                <CardDescription>
                  Planos flexíveis que se adaptam às suas necessidades
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialized Labor Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mão de Obra Especializada
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contrate profissionais qualificados para serviços específicos. Fácil, rápido e confiável.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Hammer className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Pedreiro</CardTitle>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Sparkles className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Faxineira</CardTitle>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Utensils className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Garçom</CardTitle>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Wrench className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Encanador</CardTitle>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Paintbrush className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Pintor</CardTitle>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <HomeIcon className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Jardineiro</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/servicos">
              <Button size="lg">
                Ver Todos os Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Planos e Preços
            </h2>
            <p className="text-gray-600">
              Escolha o plano ideal para seu perfil
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Básico</CardTitle>
                <CardDescription>Para candidatos iniciantes</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 29</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Até 10 candidaturas/mês
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Perfil básico
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Alertas de vagas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-600 border-2">
              <CardHeader>
                <CardTitle>Profissional</CardTitle>
                <CardDescription>Para empresas em crescimento</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 99</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Candidaturas ilimitadas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Até 5 vagas ativas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Destaque no perfil
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Para grandes empresas</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 299</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Vagas ilimitadas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Prioridade na busca
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Suporte dedicado
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a milhares de profissionais e empresas
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary">
              Criar Conta Gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Sine Santa Maria. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
