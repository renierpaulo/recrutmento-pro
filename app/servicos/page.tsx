import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Hammer, Sparkles, Utensils, Wrench, Paintbrush, Home, Zap, Drill, Car, ChefHat, Star, MapPin, Clock, DollarSign } from "lucide-react"

const serviceCategories = [
  { id: "PEDREIRO", name: "Pedreiro", icon: Hammer, color: "bg-orange-100 text-orange-600" },
  { id: "FAXINEIRA", name: "Faxineira", icon: Sparkles, color: "bg-pink-100 text-pink-600" },
  { id: "GARCOM", name: "Garçom", icon: Utensils, color: "bg-purple-100 text-purple-600" },
  { id: "ENCANADOR", name: "Encanador", icon: Wrench, color: "bg-blue-100 text-blue-600" },
  { id: "PINTOR", name: "Pintor", icon: Paintbrush, color: "bg-green-100 text-green-600" },
  { id: "JARDINEIRO", name: "Jardineiro", icon: Home, color: "bg-emerald-100 text-emerald-600" },
  { id: "ELETRICISTA", name: "Eletricista", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
  { id: "CARPINTEIRO", name: "Carpinteiro", icon: Drill, color: "bg-amber-100 text-amber-600" },
  { id: "MECANICO", name: "Mecânico", icon: Car, color: "bg-gray-100 text-gray-600" },
  { id: "COZINHEIRO", name: "Cozinheiro", icon: ChefHat, color: "bg-red-100 text-red-600" },
]

// Mock data - This would come from the database
const mockProviders = [
  {
    id: "1",
    name: "João Silva",
    category: "PEDREIRO",
    description: "Pedreiro com 15 anos de experiência em construção civil, reformas e acabamentos.",
    hourlyRate: 50.00,
    experienceYears: 15,
    location: "Santa Maria, SP",
    rating: 4.8,
    totalJobs: 127,
    available: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    category: "FAXINEIRA",
    description: "Profissional de limpeza especializada em residências e escritórios.",
    hourlyRate: 35.00,
    experienceYears: 8,
    location: "Santa Maria, SP",
    rating: 4.9,
    totalJobs: 243,
    available: true,
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    category: "ENCANADOR",
    description: "Encanador especializado em instalações hidráulicas e reparos emergenciais.",
    hourlyRate: 60.00,
    experienceYears: 12,
    location: "Santa Maria, SP",
    rating: 4.7,
    totalJobs: 156,
    available: true,
  },
  {
    id: "4",
    name: "Ana Costa",
    category: "GARCOM",
    description: "Garçonete profissional para eventos, festas e restaurantes.",
    hourlyRate: 40.00,
    experienceYears: 5,
    location: "Santa Maria, SP",
    rating: 4.6,
    totalJobs: 89,
    available: true,
  },
]

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Mão de Obra Especializada
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Encontre profissionais qualificados para o seu projeto. Rápido, fácil e confiável.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorias de Serviços</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  className={`${category.color} p-4 rounded-lg hover:shadow-md transition-shadow text-center`}
                >
                  <Icon className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">{category.name}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Providers List Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Profissionais Disponíveis</h2>
            <Link href="/servicos/cadastrar">
              <Button>Cadastrar-se como Profissional</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProviders.map((provider) => {
              const categoryInfo = serviceCategories.find(c => c.id === provider.category)
              const Icon = categoryInfo?.icon || Hammer
              
              return (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${categoryInfo?.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          <CardDescription>{categoryInfo?.name}</CardDescription>
                        </div>
                      </div>
                      {provider.available && (
                        <Badge className="bg-green-100 text-green-700">Disponível</Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {provider.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{provider.experienceYears} anos de experiência</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">R$ {provider.hourlyRate.toFixed(2)}/hora</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{provider.rating}</span>
                        <span className="text-gray-600">({provider.totalJobs} trabalhos)</span>
                      </div>
                    </div>
                    
                    <Link href={`/servicos/${provider.id}`}>
                      <Button className="w-full">
                        Ver Perfil e Solicitar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {mockProviders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Nenhum profissional disponível no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Escolha o Profissional</h3>
              <p className="text-gray-600">Navegue pelas categorias e encontre o profissional ideal</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Solicite o Serviço</h3>
              <p className="text-gray-600">Preencha o formulário com detalhes do seu projeto</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Receba o Atendimento</h3>
              <p className="text-gray-600">O profissional entra em contato para agendar</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
