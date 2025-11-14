"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Star, MapPin, Clock, DollarSign, Phone, Calendar, ArrowLeft, CheckCircle, Hammer } from "lucide-react"

// Mock data - would come from database
const mockProvider = {
  id: "1",
  name: "João Silva",
  category: "Pedreiro",
  description: "Pedreiro com 15 anos de experiência em construção civil, reformas e acabamentos. Especializado em alvenaria, revestimentos e acabamentos finos. Atendo residências, comércios e obras de pequeno e médio porte.",
  hourlyRate: 50.00,
  experienceYears: 15,
  location: "Santa Maria, SP",
  phone: "(11) 98765-4321",
  rating: 4.8,
  totalJobs: 127,
  available: true,
  certifications: ["NR-35 - Trabalho em Altura", "NR-18 - Construção Civil"],
  portfolio: [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
  ]
}

export default function ServiceProviderPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    description: "",
    location: "",
    preferredDate: "",
    budget: "",
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
              <CardTitle className="text-2xl">Solicitação Enviada!</CardTitle>
              <CardDescription>
                Sua solicitação foi enviada para {mockProvider.name}. Em breve você receberá um contato para agendar o serviço.
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/servicos">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Provider Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
                      <Hammer className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{mockProvider.name}</CardTitle>
                      <CardDescription className="text-lg">{mockProvider.category}</CardDescription>
                    </div>
                  </div>
                  {mockProvider.available && (
                    <Badge className="bg-green-100 text-green-700">Disponível</Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-lg">{mockProvider.rating}</span>
                    <span className="text-gray-600">({mockProvider.totalJobs} trabalhos realizados)</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{mockProvider.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{mockProvider.experienceYears} anos de experiência</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{mockProvider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="font-semibold text-lg">R$ {mockProvider.hourlyRate.toFixed(2)}/hora</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-lg mb-2">Sobre</h3>
                    <p className="text-gray-700">{mockProvider.description}</p>
                  </div>

                  {mockProvider.certifications.length > 0 && (
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-lg mb-2">Certificações</h3>
                      <div className="flex flex-wrap gap-2">
                        {mockProvider.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {mockProvider.portfolio.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Portfólio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {mockProvider.portfolio.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Trabalho ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Request Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Solicitar Serviço</CardTitle>
                <CardDescription>
                  Preencha o formulário para solicitar um orçamento
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Seu Nome</Label>
                    <Input
                      id="clientName"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientEmail">Seu Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientPhone">Seu Telefone</Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Localização do Serviço</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Endereço completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredDate">Data Preferencial</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Orçamento Estimado (R$)</Label>
                    <Input
                      id="budget"
                      type="number"
                      step="0.01"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="Opcional"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição do Serviço</Label>
                    <textarea
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Descreva o que você precisa..."
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
