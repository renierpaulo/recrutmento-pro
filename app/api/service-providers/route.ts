import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/service-providers - List all service providers with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const location = searchParams.get("location")
    const available = searchParams.get("available")

    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      }
    }
    
    if (available === "true") {
      where.available = true
    }

    const providers = await prisma.serviceProvider.findMany({
      where,
      orderBy: [
        { rating: 'desc' },
        { totalJobs: 'desc' }
      ]
    })

    return NextResponse.json(providers)
  } catch (error) {
    console.error("Error fetching service providers:", error)
    return NextResponse.json(
      { error: "Failed to fetch service providers" },
      { status: 500 }
    )
  }
}

// POST /api/service-providers - Create a new service provider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      userId,
      category,
      description,
      hourlyRate,
      experienceYears,
      location,
      phone,
      certifications
    } = body

    // Validate required fields
    if (!userId || !category || !description || !location || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const provider = await prisma.serviceProvider.create({
      data: {
        userId,
        category,
        description,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        experienceYears: experienceYears ? parseInt(experienceYears) : null,
        location,
        phone,
        certifications: certifications || [],
        available: true,
        totalJobs: 0,
      }
    })

    return NextResponse.json(provider, { status: 201 })
  } catch (error) {
    console.error("Error creating service provider:", error)
    return NextResponse.json(
      { error: "Failed to create service provider" },
      { status: 500 }
    )
  }
}
