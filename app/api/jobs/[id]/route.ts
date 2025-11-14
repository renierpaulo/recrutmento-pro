import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: params.id,
      },
      include: {
        company: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!job) {
      return NextResponse.json(
        { error: "Vaga não encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json(
      { error: "Erro ao buscar vaga" },
      { status: 500 }
    )
  }
}
