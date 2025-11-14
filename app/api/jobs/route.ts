import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/jobs - List all active jobs
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const search = searchParams.get('search')

    const where: any = {
      isActive: true
    }

    if (type) {
      where.type = type
    }

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        company: {
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
        createdAt: 'desc'
      }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json(
      { error: "Erro ao buscar vagas" },
      { status: 500 }
    )
  }
}

// POST /api/jobs - Create new job (companies only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      )
    }

    const body = await req.json()
    const {
      title,
      description,
      requirements,
      responsibilities,
      salary,
      location,
      remote,
      type,
      experienceLevel
    } = body

    // Get company profile
    const company = await prisma.company.findUnique({
      where: { userId: session.user.id }
    })

    if (!company) {
      return NextResponse.json(
        { error: "Perfil da empresa não encontrado" },
        { status: 404 }
      )
    }

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title,
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        salary,
        location,
        remote: remote || false,
        type: type || "FULL_TIME",
        experienceLevel: experienceLevel || "INTERMEDIATE"
      }
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json(
      { error: "Erro ao criar vaga" },
      { status: 500 }
    )
  }
}
