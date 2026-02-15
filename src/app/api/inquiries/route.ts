// app/api/inquiries/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { inquirySchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const skip = (page - 1) * limit

    const where: Prisma.InquiryWhereInput =
      status && status !== 'ALL'
        ? { status: status as Prisma.InquiryWhereInput['status'] }
        : {}

    const [data, totalCount] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          message: true,
          propertyId: true,
          source: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.inquiry.count({ where }),
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
    const validated = inquirySchema.parse(body)

    const inquiry = await prisma.inquiry.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        email: validated.email || null,
        message: validated.message || null,
        propertyId: validated.propertyId || null,
        source: validated.source,
        status: 'NEW',
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
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

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(inquiry)
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

    await prisma.inquiry.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
