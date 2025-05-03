import { PrismaClient, Role, RequestStatus } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Categories
  const fashion = await prisma.category.create({ data: { name: 'Fashion' } });
  const beauty = await prisma.category.create({ data: { name: 'Beauty' } });

  // Users
  const influencerUser = await prisma.user.create({
    data: {
      name: 'Alice Influencer',
      email: 'alice@influencer.com',
      password: 'hashedpassword1',
      role: Role.INFLUENCER,
      influencerProfile: {
        create: {
          categoryId: fashion.id,
          location: 'New York, USA',
          bio: 'Fashion and lifestyle influencer.',
          instagram: '@alice_influencer',
          youtube: 'aliceyt',
          tiktok: 'alicetok',
          followers: 12000,
          rate: 250.0,
          topCreator: true,
          respondsFast: true,
        },
      },
    },
    include: { influencerProfile: true },
  });

  const brandUser = await prisma.user.create({
    data: {
      name: 'Brandly',
      email: 'contact@brandly.com',
      password: 'hashedpassword2',
      role: Role.BRAND,
      brandProfile: {
        create: {
          company: 'Brandly Inc.',
          website: 'https://brandly.com',
          industry: 'Fashion',
          description: 'A leading fashion brand.',
        },
      },
    },
    include: { brandProfile: true },
  });

  // Campaign
  const campaign = await prisma.campaign.create({
    data: {
      brandId: brandUser.brandProfile!.id,
      title: 'Spring Collection Launch',
      description: 'Promote our new spring collection.',
      budget: 5000,
      deadline: new Date('2024-06-30'),
    },
  });

  // Collaboration Request
  await prisma.collaborationRequest.create({
    data: {
      campaignId: campaign.id,
      influencerId: influencerUser.influencerProfile!.id,
      status: RequestStatus.PENDING,
      message: 'We would love to work with you!',
    },
  });

  // Comment
  await prisma.comment.create({
    data: {
      influencerId: influencerUser.influencerProfile!.id,
      brandId: brandUser.brandProfile!.id,
      text: 'Great collaboration experience!',
      rating: 5,
    },
  });

  console.log('Sample data created!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
