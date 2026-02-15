// app/api/visits/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { visitSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const skip = (page - 1) * limit

    const where: Prisma.VisitWhereInput =
      status && status !== 'ALL'
        ? { status: status as Prisma.VisitWhereInput['status'] }
        : {}

    const [data, totalCount] = await Promise.all([
      prisma.visit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          propertyId: true,
          visitDate: true,
          visitTime: true,
          message: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.visit.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      data,
      totalCount,
      totalPages,
      currentPage: page,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = visitSchema.parse(body)

    const visit = await prisma.visit.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        email: validated.email || null,
        propertyId: validated.propertyId || null,
        visitDate: new Date(validated.visitDate),
        visitTime: validated.visitTime,
        message: validated.message || null,
        status: 'SCHEDULED',
      },
    })

    return NextResponse.json(visit, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    const visit = await prisma.visit.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(visit)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    await prisma.visit.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
