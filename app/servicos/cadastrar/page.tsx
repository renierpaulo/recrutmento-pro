"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, CheckCircle } from "lucide-react"

const serviceCategories = [
  { id: "PEDREIRO", name: "Pedreiro" },
  { id: "FAXINEIRA", name: "Faxineira" },
  { id: "GARCOM", name: "Garçom" },
  { id: "ENCANADOR", name: "Encanador" },
  { id: "PINTOR", name: "Pintor" },
  { id: "JARDINEIRO", name: "Jardineiro" },
  { id: "ELETRICISTA", name: "Eletricista" },
  { id: "CARPINTEIRO", name: "Carpinteiro" },
  { id: "MECANICO", name: "Mecânico" },
  { id: "COZINHEIRO", name: "Cozinheiro" },
  { id: "OUTROS", name: "Outros" },
]

export default function CadastrarServicoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    hourlyRate: "",
    experienceYears: "",
    location: "",
    certifications: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        router.push("/servicos")
      }, 2000)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Cadastro Realizado com Sucesso!</CardTitle>
              <CardDescription className="text-lg">
                Seu perfil foi criado e está aguardando aprovação. Em breve você estará disponível para receber solicitações de serviço.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/servicos">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Cadastrar-se como Profissional</CardTitle>
            <CardDescription>
              Preencha seus dados para começar a receber solicitações de serviço
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informações Pessoais</h3>
                
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Localização (Cidade, Estado) *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Santa Maria, SP"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Informações Profissionais</h3>
                
                <div>
                  <Label htmlFor="category">Categoria de Serviço *</Label>
                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecione uma categoria</option>
                    {serviceCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Descrição do Serviço *</Label>
                  <textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Descreva sua experiência, especialidades e diferenciais..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyRate">Valor por Hora (R$) *</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                      placeholder="50.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experienceYears">Anos de Experiência *</Label>
                    <Input
                      id="experienceYears"
                      type="number"
                      min="0"
                      required
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="certifications">Certificações (opcional)</Label>
                  <Input
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => setFormData({...formData, certifications: e.target.value})}
                    placeholder="Separe por vírgula: NR-35, NR-18, etc."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Liste suas certificações separadas por vírgula
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Próximos Passos</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Seu perfil será analisado pela equipe do Sine Santa Maria</li>
                  <li>Você receberá um email de confirmação em até 48 horas</li>
                  <li>Após aprovação, seu perfil ficará visível para clientes</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Finalizar Cadastro"}
                </Button>
                <Link href="/servicos" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
