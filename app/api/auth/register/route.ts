import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name, role } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "CANDIDATE",
      }
    })

    // Create profile based on role
    if (user.role === "CANDIDATE") {
      await prisma.candidate.create({
        data: {
          userId: user.id,
          skills: [],
        }
      })
    } else if (user.role === "COMPANY") {
      await prisma.company.create({
        data: {
          userId: user.id,
          companyName: name || "Minha Empresa",
        }
      })
    }

    return NextResponse.json(
      { message: "Usuário criado com sucesso", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    )
  }
}
