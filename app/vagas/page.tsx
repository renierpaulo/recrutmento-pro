"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Clock, Search } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs")
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.companyName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Vagas Disponíveis
          </h1>
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar vagas ou empresas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando vagas...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma vaga encontrada</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {job.company.companyName}
                      </CardDescription>
                    </div>
                    <Link href={`/vagas/${job.id}`}>
                      <Button>Ver Detalhes</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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

                  <p className="mt-4 text-gray-700 line-clamp-2">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
