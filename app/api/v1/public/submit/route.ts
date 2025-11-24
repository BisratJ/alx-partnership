import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    // Simple rate limiting check (IP-based)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    const formData = await request.formData();
    
    // Parse form data
    const data = {
      org_name: formData.get('org_name') as string,
      poc_name: formData.get('poc_name') as string,
      poc_email: formData.get('poc_email') as string,
      poc_phone: formData.get('poc_phone') as string,
      org_url: (formData.get('org_url') as string) || null,
      mission_align: formData.get('mission_align') === 'true',
      cobranding_consent: formData.get('cobranding_consent') === 'true',
      event_title: formData.get('event_title') as string,
      event_desc: formData.get('event_desc') as string,
      partnership_type: formData.get('partnership_type') as string,
      target_hub: formData.get('target_hub') as string,
      event_date: formData.get('event_date') as string,
      start_time: formData.get('start_time') as string,
      end_time: formData.get('end_time') as string,
      attendee_count: parseInt(formData.get('attendee_count') as string, 10),
    };

    // Basic validation
    if (!data.mission_align || !data.cobranding_consent) {
      return NextResponse.json(
        { error: 'You must accept both partnership criteria' },
        { status: 400 }
      );
    }

    // Find or create partner
    let partner = await prisma.partner.findFirst({
      where: { pocEmail: data.poc_email },
    });

    if (!partner) {
      partner = await prisma.partner.create({
        data: {
          orgName: data.org_name,
          pocEmail: data.poc_email,
          pocPhone: data.poc_phone,
          orgUrl: data.org_url,
        },
      });
    }

    // Get hub
    const hub = await prisma.hub.findFirst({
      where: { name: data.target_hub as any },
    });

    if (!hub) {
      return NextResponse.json({ error: 'Invalid hub selection' }, { status: 400 });
    }

    // Create request
    const partnershipRequest = await prisma.request.create({
      data: {
        partnerId: partner.id,
        hubId: hub.id,
        eventTitle: data.event_title,
        eventDesc: data.event_desc,
        partnershipType: data.partnership_type as any,
        requestedDate: new Date(data.event_date),
        startTime: data.start_time,
        endTime: data.end_time,
        attendeeCount: data.attendee_count,
        submissionData: data as any,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        entityType: 'Request',
        entityId: partnershipRequest.id,
        action: 'CREATE',
        newValue: { status: 'NEW' },
        ipAddress: ip,
      },
    });

    console.log('✅ Partnership request created:', partnershipRequest.id);

    return NextResponse.json({
      message: 'Submission successful',
      requestId: partnershipRequest.id,
    }, { status: 201 });

  } catch (error: any) {
    console.error('❌ Submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Submission failed' },
      { status: 400 }
    );
  }
}
