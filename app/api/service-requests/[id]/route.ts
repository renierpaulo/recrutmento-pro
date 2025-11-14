import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/service-requests/[id] - Get a specific service request
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
      include: {
        serviceProvider: true
      }
    })

    if (!serviceRequest) {
      return NextResponse.json(
        { error: "Service request not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(serviceRequest)
  } catch (error) {
    console.error("Error fetching service request:", error)
    return NextResponse.json(
      { error: "Failed to fetch service request" },
      { status: 500 }
    )
  }
}

// PATCH /api/service-requests/[id] - Update a service request (e.g., change status)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const updateData: any = {}
    
    // Only update fields that are provided
    if (body.status !== undefined) updateData.status = body.status
    if (body.description !== undefined) updateData.description = body.description
    if (body.location !== undefined) updateData.location = body.location
    if (body.preferredDate !== undefined) {
      updateData.preferredDate = body.preferredDate ? new Date(body.preferredDate) : null
    }
    if (body.budget !== undefined) {
      updateData.budget = body.budget ? parseFloat(body.budget) : null
    }

    const serviceRequest = await prisma.serviceRequest.update({
      where: { id: params.id },
      data: updateData,
      include: {
        serviceProvider: true
      }
    })

    return NextResponse.json(serviceRequest)
  } catch (error) {
    console.error("Error updating service request:", error)
    return NextResponse.json(
      { error: "Failed to update service request" },
      { status: 500 }
    )
  }
}

// DELETE /api/service-requests/[id] - Delete/Cancel a service request
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.serviceRequest.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Service request deleted successfully" })
  } catch (error) {
    console.error("Error deleting service request:", error)
    return NextResponse.json(
      { error: "Failed to delete service request" },
      { status: 500 }
    )
  }
}
