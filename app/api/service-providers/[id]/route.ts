import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/service-providers/[id] - Get a specific service provider
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const provider = await prisma.serviceProvider.findUnique({
      where: { id: params.id },
      include: {
        serviceRequests: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!provider) {
      return NextResponse.json(
        { error: "Service provider not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(provider)
  } catch (error) {
    console.error("Error fetching service provider:", error)
    return NextResponse.json(
      { error: "Failed to fetch service provider" },
      { status: 500 }
    )
  }
}

// PATCH /api/service-providers/[id] - Update a service provider
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const updateData: any = {}
    
    // Only update fields that are provided
    if (body.description !== undefined) updateData.description = body.description
    if (body.hourlyRate !== undefined) updateData.hourlyRate = parseFloat(body.hourlyRate)
    if (body.experienceYears !== undefined) updateData.experienceYears = parseInt(body.experienceYears)
    if (body.location !== undefined) updateData.location = body.location
    if (body.phone !== undefined) updateData.phone = body.phone
    if (body.available !== undefined) updateData.available = body.available
    if (body.certifications !== undefined) updateData.certifications = body.certifications
    if (body.portfolio !== undefined) updateData.portfolio = body.portfolio

    const provider = await prisma.serviceProvider.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json(provider)
  } catch (error) {
    console.error("Error updating service provider:", error)
    return NextResponse.json(
      { error: "Failed to update service provider" },
      { status: 500 }
    )
  }
}

// DELETE /api/service-providers/[id] - Delete a service provider
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.serviceProvider.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Service provider deleted successfully" })
  } catch (error) {
    console.error("Error deleting service provider:", error)
    return NextResponse.json(
      { error: "Failed to delete service provider" },
      { status: 500 }
    )
  }
}
