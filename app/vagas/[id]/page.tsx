"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Clock, Building } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    fetchJob()
  }, [params.id])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setJob(data)
      }
    } catch (error) {
      console.error("Error fetching job:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!session) {
      router.push("/login")
      return
    }

    setApplying(true)
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: params.id,
          coverLetter,
        }),
      })

      if (response.ok) {
        setHasApplied(true)
        alert("Candidatura enviada com sucesso!")
      } else {
        const data = await response.json()
        alert(data.error || "Erro ao enviar candidatura")
      }
    } catch (error) {
      alert("Erro ao enviar candidatura")
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p>Vaga não encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div>
                <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                <CardDescription className="text-xl flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {job.company.companyName}
                </CardDescription>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {job.type === "FULL_TIME" && "Tempo Integral"}
                {job.type === "PART_TIME" && "Meio Período"}
                {job.type === "CONTRACT" && "Contrato"}
                {job.type === "FREELANCE" && "Freelance"}
                {job.type === "INTERNSHIP" && "Estágio"}
              </Badge>
              <Badge variant="outline">
                {job.experienceLevel === "ENTRY" && "Júnior"}
                {job.experienceLevel === "INTERMEDIATE" && "Pleno"}
                {job.experienceLevel === "SENIOR" && "Sênior"}
                {job.experienceLevel === "EXECUTIVE" && "Executivo"}
              </Badge>
              {job.remote && (
                <Badge variant="default">Remoto</Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
              {job.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Publicada {formatDate(job.createdAt)}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Descrição</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Responsabilidades</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {job.responsibilities.map((resp: string, index: number) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Requisitos</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {job.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {session?.user?.role === "CANDIDATE" && !hasApplied && (
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Candidatar-se</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="coverLetter">Carta de Apresentação (opcional)</Label>
                    <textarea
                      id="coverLetter"
                      className="w-full mt-2 p-3 border rounded-md"
                      rows={6}
                      placeholder="Conte por que você é o candidato ideal para esta vaga..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleApply} 
                    disabled={applying}
                    size="lg"
                    className="w-full"
                  >
                    {applying ? "Enviando..." : "Enviar Candidatura"}
                  </Button>
                </div>
              </div>
            )}

            {hasApplied && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                <p className="text-green-800 font-semibold">
                  Candidatura enviada com sucesso!
                </p>
              </div>
            )}

            {!session && (
              <div className="border-t pt-6 text-center">
                <p className="text-gray-600 mb-4">
                  Faça login para se candidatar a esta vaga
                </p>
                <Button onClick={() => router.push("/login")} size="lg">
                  Fazer Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
