import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/service-requests - List service requests (optionally by provider)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceProviderId = searchParams.get("serviceProviderId")
    const status = searchParams.get("status")

    const where: any = {}
    
    if (serviceProviderId) {
      where.serviceProviderId = serviceProviderId
    }
    
    if (status) {
      where.status = status
    }

    const requests = await prisma.serviceRequest.findMany({
      where,
      include: {
        serviceProvider: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching service requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch service requests" },
      { status: 500 }
    )
  }
}

// POST /api/service-requests - Create a new service request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      serviceProviderId,
      clientName,
      clientEmail,
      clientPhone,
      description,
      location,
      preferredDate,
      budget
    } = body

    // Validate required fields
    if (!serviceProviderId || !clientName || !clientEmail || !clientPhone || !description || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        serviceProviderId,
        clientName,
        clientEmail,
        clientPhone,
        description,
        location,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        budget: budget ? parseFloat(budget) : null,
        status: "PENDING"
      },
      include: {
        serviceProvider: true
      }
    })

    // Here you could send an email notification to the service provider
    // await sendEmailNotification(serviceRequest)

    return NextResponse.json(serviceRequest, { status: 201 })
  } catch (error) {
    console.error("Error creating service request:", error)
    return NextResponse.json(
      { error: "Failed to create service request" },
      { status: 500 }
    )
  }
}
