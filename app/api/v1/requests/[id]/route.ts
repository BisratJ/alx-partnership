import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestId = params.id;

    const partnershipRequest = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        partner: {
          select: {
            orgName: true,
            pocEmail: true,
            pocPhone: true,
          },
        },
        hub: {
          select: {
            name: true,
            timezone: true,
          },
        },
        assignedTo: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!partnershipRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(partnershipRequest);
  } catch (error: any) {
    console.error('Error fetching request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request' },
      { status: 500 }
    );
  }
}
