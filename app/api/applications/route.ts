import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/applications - List user's applications
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      )
    }

    let applications

    if (session.user?.role === "CANDIDATE") {
      const candidate = await prisma.candidate.findUnique({
        where: { userId: session.user.id }
      })

      if (!candidate) {
        return NextResponse.json([])
      }

      applications = await prisma.application.findMany({
        where: { candidateId: candidate.id },
        include: {
          job: {
            include: {
              company: true
            }
          }
        },
        orderBy: {
          appliedAt: 'desc'
        }
      })
    } else if (session.user?.role === "COMPANY") {
      const company = await prisma.company.findUnique({
        where: { userId: session.user.id }
      })

      if (!company) {
        return NextResponse.json([])
      }

      applications = await prisma.application.findMany({
        where: {
          job: {
            companyId: company.id
          }
        },
        include: {
          job: true,
          candidate: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true
                }
              }
            }
          }
        },
        orderBy: {
          appliedAt: 'desc'
        }
      })
    }

    return NextResponse.json(applications || [])
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Erro ao buscar candidaturas" },
      { status: 500 }
    )
  }
}

// POST /api/applications - Apply to a job
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "CANDIDATE") {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { jobId, coverLetter } = body

    const candidate = await prisma.candidate.findUnique({
      where: { userId: session.user.id }
    })

    if (!candidate) {
      return NextResponse.json(
        { error: "Perfil de candidato não encontrado" },
        { status: 404 }
      )
    }

    // Check if already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: candidate.id,
          jobId
        }
      }
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: "Você já se candidatou a esta vaga" },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId,
        coverLetter
      }
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Erro ao criar candidatura" },
      { status: 500 }
    )
  }
}
