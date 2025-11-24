import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create hubs
  const capstone = await prisma.hub.upsert({
    where: { name: 'CAPSTONE' },
    update: {},
    create: {
      name: 'CAPSTONE',
      timezone: 'Africa/Nairobi',
      openTime: '09:00',
      closeTime: '20:00',
      isActive: true,
    },
  });

  const citypoint = await prisma.hub.upsert({
    where: { name: 'CITYPOINT' },
    update: {},
    create: {
      name: 'CITYPOINT',
      timezone: 'Africa/Nairobi',
      openTime: '09:00',
      closeTime: '20:00',
      isActive: true,
    },
  });

  const virtual = await prisma.hub.upsert({
    where: { name: 'VIRTUAL' },
    update: {},
    create: {
      name: 'VIRTUAL',
      timezone: 'Africa/Nairobi',
      openTime: '00:00',
      closeTime: '23:59',
      isActive: true,
    },
  });

  console.log('✅ Hubs created:', { capstone, citypoint, virtual });

  // Create an admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@alxafrica.com' },
    update: {},
    create: {
      email: 'admin@alxafrica.com',
      fullName: 'Admin User',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin user created:', adminUser);

  // Create a test partner
  const existingPartner = await prisma.partner.findFirst({
    where: { pocEmail: 'partner@example.com' },
  });

  const testPartner = existingPartner || await prisma.partner.create({
    data: {
      orgName: 'Test Organization',
      pocEmail: 'partner@example.com',
      pocPhone: '+254712345678',
      orgUrl: 'https://example.com',
    },
  });

  console.log('✅ Test partner created:', testPartner);

  // Create a sample request
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30); // 30 days from now

  const sampleRequest = await prisma.request.create({
    data: {
      partnerId: testPartner.id,
      hubId: capstone.id,
      eventTitle: 'Sample Tech Workshop',
      eventDesc: 'A sample workshop to demonstrate the platform functionality.',
      partnershipType: 'EVENT',
      requestedDate: futureDate,
      startTime: '14:00',
      endTime: '17:00',
      attendeeCount: 50,
      status: 'NEW',
      submissionData: {
        mission_align: true,
        cobranding_consent: true,
      },
    },
  });

  console.log('✅ Sample request created:', sampleRequest);

  // Create system configuration
  const config = await prisma.systemConfig.upsert({
    where: { key: 'hub_holidays_2025' },
    update: {},
    create: {
      key: 'hub_holidays_2025',
      value: ['2025-12-25', '2025-12-26', '2025-01-01'],
    },
  });

  console.log('✅ System configuration created:', config);

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log('  - 3 Hubs created');
  console.log('  - 1 Admin user created');
  console.log('  - 1 Test partner created');
  console.log('  - 1 Sample request created');
  console.log('  - System configuration initialized');
  console.log('');
  console.log('🔐 Test Credentials:');
  console.log('  Admin: admin@alxafrica.com (use Google OAuth)');
  console.log('  Partner: partner@example.com');
  console.log('');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
