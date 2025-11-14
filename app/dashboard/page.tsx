"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, FileText, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/applications")
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const isCandidate = session.user?.role === "CANDIDATE"
  const isCompany = session.user?.role === "COMPANY"

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo, {session.user?.name}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {isCandidate && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Candidaturas Enviadas
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total de candidaturas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Em Análise
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {applications.filter(a => a.status === "REVIEWING").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Aguardando resposta
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Entrevistas
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {applications.filter(a => a.status === "INTERVIEW").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Agendadas
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {isCompany && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Vagas Ativas
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    Publicadas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Candidaturas Recebidas
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total de candidatos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Para Revisar
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {applications.filter(a => a.status === "PENDING").length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Aguardando análise
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex gap-4">
            {isCandidate && (
              <Link href="/vagas">
                <Button>Buscar Vagas</Button>
              </Link>
            )}
            {isCompany && (
              <Link href="/dashboard/criar-vaga">
                <Button>Criar Nova Vaga</Button>
              </Link>
            )}
            <Link href="/assinatura">
              <Button variant="outline">Gerenciar Assinatura</Button>
            </Link>
          </div>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isCandidate ? "Minhas Candidaturas" : "Candidaturas Recebidas"}
            </CardTitle>
            <CardDescription>
              {applications.length === 0
                ? "Nenhuma candidatura ainda"
                : `${applications.length} candidatura(s) no total`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {isCandidate
                  ? "Você ainda não se candidatou a nenhuma vaga"
                  : "Nenhuma candidatura recebida ainda"}
              </p>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((application: any) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {isCandidate
                          ? application.job?.title
                          : application.candidate?.user?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isCandidate
                          ? application.job?.company?.companyName
                          : application.job?.title}
                      </p>
                    </div>
                    <Badge
                      variant={
                        application.status === "ACCEPTED"
                          ? "default"
                          : application.status === "REJECTED"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {application.status === "PENDING" && "Pendente"}
                      {application.status === "REVIEWING" && "Em Análise"}
                      {application.status === "INTERVIEW" && "Entrevista"}
                      {application.status === "ACCEPTED" && "Aceito"}
                      {application.status === "REJECTED" && "Rejeitado"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
