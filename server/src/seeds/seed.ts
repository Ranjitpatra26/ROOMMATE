import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENV } from '../config/env.js';
import {
  UserModel,
  ProfileModel,
  RoomModel,
  MatchModel,
  StayModel,
  ReviewModel,
  LivingAgreementModel,
  ExpenseModel,
  ConversationModel,
  MessageModel,
  TrustProfileModel,
  DestinationModel,
} from '../models/index.js';

export const seedDatabase = async (disconnectAfter: boolean = true): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('[Seed] Connecting to MongoDB to seed authentic India-first development dataset...');
      await mongoose.connect(ENV.MONGODB_URI);
      console.log(`[Seed] Connected to database: ${mongoose.connection.name} @ ${mongoose.connection.host}`);
    }

    // Clear existing collections safely in development
    await Promise.all([
      UserModel.deleteMany({}),
      ProfileModel.deleteMany({}),
      RoomModel.deleteMany({}),
      MatchModel.deleteMany({}),
      StayModel.deleteMany({}),
      ReviewModel.deleteMany({}),
      LivingAgreementModel.deleteMany({}),
      ExpenseModel.deleteMany({}),
      ConversationModel.deleteMany({}),
      MessageModel.deleteMany({}),
      TrustProfileModel.deleteMany({}),
      DestinationModel.deleteMany({}),
    ]);

    console.log('[Seed] All existing collections cleared.');

    const passwordHash = await bcrypt.hash('Kinship2026!', 10);

    // =========================================================================
    // 1. SEED 32 AUTHENTIC INDIAN USERS (UserModel)
    // =========================================================================
    const usersSeedData = [
      { email: 'ananya.sharma@example.com', role: 'verified_resident' as const },
      { email: 'aarav.mehta@example.com', role: 'verified_resident' as const },
      { email: 'rohan.patil@example.com', role: 'verified_resident' as const },
      { email: 'ishita.nair@example.com', role: 'member' as const },
      { email: 'aditya.kulkarni@example.com', role: 'member' as const },
      { email: 'meera.iyer@example.com', role: 'member' as const },
      { email: 'arjun.rao@example.com', role: 'member' as const },
      { email: 'kavya.menon@example.com', role: 'member' as const },
      { email: 'rahul.deshmukh@example.com', role: 'member' as const },
      { email: 'sneha.kapoor@example.com', role: 'member' as const },
      { email: 'vikramaditya.sen@example.com', role: 'member' as const },
      { email: 'tara.alvares@example.com', role: 'verified_resident' as const },
      { email: 'nikhil.joshi@example.com', role: 'member' as const },
      { email: 'pooja.hegde@example.com', role: 'verified_resident' as const },
      { email: 'devansh.singhania@example.com', role: 'member' as const },
      { email: 'shreya.mukherjee@example.com', role: 'member' as const },
      { email: 'zainab.merchant@example.com', role: 'verified_resident' as const },
      { email: 'karthik.sundaram@example.com', role: 'member' as const },
      { email: 'aniruddh.varma@example.com', role: 'verified_resident' as const },
      { email: 'diya.chawla@example.com', role: 'member' as const },
      { email: 'samarth.kulkarni@example.com', role: 'member' as const },
      { email: 'natasha.lobo@example.com', role: 'verified_resident' as const },
      { email: 'pranav.nambiar@example.com', role: 'member' as const },
      { email: 'rhea.bhattacharya@example.com', role: 'member' as const },
      { email: 'harshvardhan.rathore@example.com', role: 'verified_resident' as const },
      { email: 'tanvi.shenoy@example.com', role: 'member' as const },
      { email: 'aman.qureshi@example.com', role: 'member' as const },
      { email: 'simran.sethi@example.com', role: 'member' as const },
      { email: 'omkar.gokhale@example.com', role: 'member' as const },
      { email: 'lavanya.reddy@example.com', role: 'member' as const },
      { email: 'farhan.mirza@example.com', role: 'member' as const },
      { email: 'arundhati.das@example.com', role: 'member' as const },
    ];

    const createdUsers = [];
    for (const u of usersSeedData) {
      const user = await UserModel.create({
        email: u.email,
        passwordHash,
        role: u.role,
        status: 'active',
      });
      createdUsers.push(user);
    }

    console.log(`[Seed] Seeded ${createdUsers.length} Users.`);

    // =========================================================================
    // 2. SEED 32 PROFILES & LIFESTYLE DNA (ProfileModel)
    // =========================================================================
    const rawProfilesData = [
      {
        displayName: 'Ananya Sharma',
        headline: 'Spatial Architect & Ceramicist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        bio: 'Seeking a serene, sunlit sanctuary in Indiranagar. Morning filter coffee ritual, strict quiet hours after 10:30 PM, and mindful shared kitchen cleanliness.',
        budgetRange: { min: 18000, max: 28000, currency: 'INR' },
        preferredLocations: ['Indiranagar, Bengaluru', 'Domlur, Bengaluru'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Filter Coffee', 'Quiet Hours', 'Architectural Digest'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Aarav Mehta',
        headline: 'Fintech Product Lead & Vinyl Collector',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvMpO73IsC2lGAlRr8a36w9vef0AdMCr2Vkf2wPGWyc-PNq19KyOn91r8y0f8Q-lzfITMOutCzx2-cPpPTEkbmlL8Y-dXkuvAXXgY5FuYEQ63pJp_Xt82aAhcLP0UNo9ec7CAZvZk50NrtBHMLs05I59ZmKQsCZyI6LxngpFa7S1yIG0lIVCS8jKrjs0n-iDl5yrvgm15aZVNTY5ofwt5EypTHeqanc-AMFnP_dB2iBbtnW1pHEI_uQ',
        bio: 'Looking for a heritage flat in Bandra West with wooden floors. I enjoy vinyl listening sessions, morning runs at Carter Road, and disciplined shared living.',
        budgetRange: { min: 22000, max: 35000, currency: 'INR' },
        preferredLocations: ['Bandra West, Mumbai', 'Khar West, Mumbai'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Vinyl Collector', 'Quiet Hours', 'Carter Road Runner'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 4, workStyle: 'remote', guestPolicy: 'flexible', petTolerance: ['cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Rohan Patil',
        headline: 'AI Research Scientist & Cyclist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
        bio: 'Working on multimodal vision models. Need high-speed fiber internet, peaceful work environment, and early morning quietude in Baner.',
        budgetRange: { min: 12000, max: 20000, currency: 'INR' },
        preferredLocations: ['Baner, Pune', 'Aundh, Pune', 'Balewadi, Pune'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'High-Speed Fiber', 'Quiet Hours', 'Cyclist'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 2, workStyle: 'remote', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Ishita Nair',
        headline: 'Editorial Curator & Tea Sommelier',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
        bio: 'Passionate about typography, South Indian filter roasts, and quiet Sunday readings. Seeking a plant-filled space in Koramangala or Indiranagar.',
        budgetRange: { min: 16000, max: 26000, currency: 'INR' },
        preferredLocations: ['Koramangala, Bengaluru', 'Indiranagar, Bengaluru'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Tea Rituals', 'Quiet Hours', 'Botanical Living'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['dogs', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Aditya Kulkarni',
        headline: 'Brand Strategist & Specialty Coffee Roaster',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
        bio: 'Appreciate curated spaces, clean kitchen counters, and good sourdough bread. Work in branding and maintain respectful boundaries.',
        budgetRange: { min: 14000, max: 24000, currency: 'INR' },
        preferredLocations: ['Koregaon Park, Pune', 'Kalyani Nagar, Pune'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Specialty Coffee', 'Quiet Hours', 'Design Minded'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 4, workStyle: 'hybrid', guestPolicy: 'flexible', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Meera Iyer',
        headline: 'Design Systems Lead & Classical Vocalist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBommkV4DLPt6GJCejGF2iQ9uT-P9wRS5mHuief1hVSrolxQIJrtBI0kZPD0erbrxdY8geGv-3mnfSu0JIVbeS_FdojbdduEqEHPIybpnYlIIeC0WZ-ItuwvMQ2ULlw4tJkLq0YQjy2ex5BQFJ26OB7hsAXxOQr_GdjK4wVY-q7PCl3_8DsTsCCl9HLR8RsAj1SsqMygz9lWOqnX_fU6R_NEAKImBCmabGKb48b_XMMyd2Yf7ZmGPXD-A',
        bio: 'Morning vocal practice with mute dampeners. Seeking a calm, coastal flat in Adyar or Besant Nagar with ocean breeze and high ceilings.',
        budgetRange: { min: 15000, max: 25000, currency: 'INR' },
        preferredLocations: ['Adyar, Chennai', 'Besant Nagar, Chennai'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Classical Music', 'Coastal Breezes', 'Clean Living'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Arjun Rao',
        headline: 'Senior Cloud Architect & Acoustician',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
        bio: 'Building enterprise infrastructure. Clean, punctual with utility splits, and mindful of roommate quiet hours.',
        budgetRange: { min: 14000, max: 22000, currency: 'INR' },
        preferredLocations: ['Madhapur, Hyderabad', 'Gachibowli, Hyderabad', 'Jubilee Hills, Hyderabad'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Acoustic Balance', 'Quiet Hours', 'Tech Focused'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Kavya Menon',
        headline: 'Documentary Filmmaker & Botanical Writer',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAHyt4KRDIw7RGLkhJSttYv3I0QeuHDW-sqRHaJ2ClbdvrvUNl4IQTzEiJnnVBZqTaEN5DwWzrMnDUMyMbFuGAysEkeiJAcj60k3RpTv2oQAyqU01paG0uVQBQAfc1y8Y92ePknF7Q4InVJ07JX3rLCmHqnE5RqV8nmboL0AjAXPH830gN7u7kr7HNJtaZSPWqoiVAH6Mc2z0mZqO-bkVcziUZIW_F9wfLIRfo41t9GavmRQgP4pd5DPg',
        bio: 'Documenting indigenous forests across India. Need a sunlit loft space near Hauz Khas Deer Park with balcony green space.',
        budgetRange: { min: 18000, max: 28000, currency: 'INR' },
        preferredLocations: ['Hauz Khas, Delhi', 'Green Park, Delhi', 'Greater Kailash, Delhi'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Forest Views', 'Quiet Hours', 'Visual Artist'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 4, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['dogs', 'cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Rahul Deshmukh',
        headline: 'Acoustics Engineer & Podcaster',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC64MbZWsNixcO8McDmNx9O0u22et38koHfzkR1L85nrNCbb5YIzzL6EMVp-HSbJhTQZQIgd_4WaL4w32CrGIgitEkcxxzRW-x-JQAf6rlgr-YzwwE8OYl8iut1Rz_pGMddRzECyh7vPq13cQSlOi5I8C-1wQqo8w9tl5PULqqKuweX89oMHAbseGsUMo0Lbj6JDZU5h4I5k0KmXmVqZMOGnpn_fd63AIUCd4gCyPkqW69Njzrwm3lCYA',
        bio: 'Audiophile with high respect for sound dampening and private quiet time. Looking for a modern 2BHK flatmate in Dadar or Lower Parel.',
        budgetRange: { min: 20000, max: 32000, currency: 'INR' },
        preferredLocations: ['Dadar West, Mumbai', 'Lower Parel, Mumbai', 'Prabhadevi, Mumbai'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Sound Isolation', 'Quiet Hours', 'Acoustic Specialist'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Sneha Kapoor',
        headline: 'Contemporary Ceramicist & Urban Botanist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDPEq_t3wsCyapXNBS865uHThQBZujCO3GiaPOfGBQzvmerZwqxLhKZ-ur2iSb2xCtFNuH7QFVc6-th58KsttfXVaPuUYHEQOhe0ZKc8lPpYDvN5NPqy_bF3jUqBjuLvvOZu0CC3Qg_q8cemmVa71PJXG89iqoX4SMRkJsufIeTWBL3QpYQCR6BMcuYQqnHSquicrX8LGb1KPLy5a66czJkWlo3wiHOfu7j3bI5hOaWYH8WgRXNg7dQKw',
        bio: 'Creating functional stoneware. Early riser who loves natural morning light, clean uncluttered surfaces, and mindful shared cooking.',
        budgetRange: { min: 17000, max: 27000, currency: 'INR' },
        preferredLocations: ['Greater Kailash, Delhi', 'Vasant Kunj, Delhi', 'Defence Colony, Delhi'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Ceramics Studio', 'Natural Light', 'Minimalist'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Vikramaditya Sen',
        headline: 'Computational Linguist & Rare Books Collector',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: 'Working on low-resource Indic NLP models. Deep appreciation for heritage high-ceiling rooms in Park Street or Ballygunge with teak bookshelves.',
        budgetRange: { min: 14000, max: 22000, currency: 'INR' },
        preferredLocations: ['Park Street, Kolkata', 'Ballygunge, Kolkata'],
        visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Rare Books', 'High Ceilings', 'Quiet Scholar'],
        lifestyleDNA: { chronotype: 'balanced', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Tara Alvares',
        headline: 'Sustainable Landscape Architect & Permaculturist',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: 'Designing climate-resilient native gardens in Goa. Seeking a serene Portuguese heritage sanctuary in Assagao or Siolim with garden access.',
        budgetRange: { min: 25000, max: 40000, currency: 'INR' },
        preferredLocations: ['Assagao, Goa', 'Siolim, Goa', 'Porvorim, Goa'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Portuguese Heritage', 'Organic Garden', 'Quiet Lifestyle'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'flexible', petTolerance: ['dogs', 'cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Nikhil Joshi',
        headline: 'Quantum Computing Researcher & Trail Runner',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        bio: 'Trail running on Vetal Tekdi at dawn, research coding through the afternoon. Looking for a bright flat in Kalyani Nagar or Baner.',
        budgetRange: { min: 15000, max: 24000, currency: 'INR' },
        preferredLocations: ['Kalyani Nagar, Pune', 'Baner, Pune', 'Aundh, Pune'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Trail Runner', 'High Focus', 'Clean Living'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 2, workStyle: 'remote', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Pooja Hegde',
        headline: 'Product Experience Lead & Coffee Enthusiast',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        bio: 'Early mornings with pourover coffee and yoga. Looking for a modern 3BHK flatmate in HSR Layout Sector 2 or 3 with dedicated workspace.',
        budgetRange: { min: 20000, max: 30000, currency: 'INR' },
        preferredLocations: ['HSR Layout, Bengaluru', 'Koramangala, Bengaluru'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Yoga Routine', 'Specialty Pourover', 'Punctual Ledger'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 4, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Devansh Singhania',
        headline: 'Quant Fund Manager & Acoustic Purist',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        bio: 'Algorithmic trading systems lead. Need a high-floor modern sanctuary on Golf Course Road with noise isolation and high-speed multi-line fiber.',
        budgetRange: { min: 30000, max: 55000, currency: 'INR' },
        preferredLocations: ['Golf Course Road, Gurugram', 'Cyber City, Gurugram'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'High-Floor Skyline', 'Soundproofing', 'Financial Discipline'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Shreya Mukherjee',
        headline: 'Ethnomusicologist & Documentary Audio Producer',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        bio: 'Documenting rare musical traditions across Bengal. Need an acoustically peaceful rowhouse room in South Kolkata with vintage charm.',
        budgetRange: { min: 13000, max: 21000, currency: 'INR' },
        preferredLocations: ['Ballygunge, Kolkata', 'Southern Avenue, Kolkata'],
        visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Audio Studio', 'Terrace Access', 'Cultured Living'],
        lifestyleDNA: { chronotype: 'balanced', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Zainab Merchant',
        headline: 'Art Historian & Heritage Gallery Director',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        bio: 'Curating South Asian modernism exhibits. Looking for high ceilings, vintage stone flooring, and a quiet artistic flatmate in Colaba or Fort.',
        budgetRange: { min: 28000, max: 48000, currency: 'INR' },
        preferredLocations: ['Colaba, Mumbai', 'Fort, Mumbai', 'Marine Lines, Mumbai'],
        visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Art Deco', 'Heritage Living', 'Museum Curations'],
        lifestyleDNA: { chronotype: 'balanced', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Karthik Sundaram',
        headline: 'Robotics Hardware Engineer & Surfer',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        bio: 'Dawn surfing sessions at Covelong Beach, building autonomous sub-systems during the day. Need a clean, breezy room in Besant Nagar.',
        budgetRange: { min: 16000, max: 26000, currency: 'INR' },
        preferredLocations: ['Besant Nagar, Chennai', 'Thiruvanmiyur, Chennai'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Surfer Lifestyle', 'Hardware Labs', 'Beach Proximity'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 4, workStyle: 'in_office', guestPolicy: 'flexible', petTolerance: ['dogs', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Aniruddh Varma',
        headline: 'Principal UX Architect & Specialty Baker',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
        bio: 'Designing global healthcare interfaces. Weekends dedicated to natural sourdough fermentation. Seeking a spacious flat in Jubilee Hills.',
        budgetRange: { min: 22000, max: 36000, currency: 'INR' },
        preferredLocations: ['Jubilee Hills, Hyderabad', 'Banjara Hills, Hyderabad'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Sourdough Baker', 'Gourmet Kitchen', 'Quiet Professional'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Diya Chawla',
        headline: 'Environmental Policy Analyst & Hiker',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
        bio: 'Working on clean energy transition frameworks. Strictly organic kitchen, zero single-use plastics, and quiet evenings in Vasant Kunj.',
        budgetRange: { min: 19000, max: 30000, currency: 'INR' },
        preferredLocations: ['Vasant Kunj, Delhi', 'Hauz Khas, Delhi'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Zero Waste', 'Aravalli Hikes', 'Eco Conscious'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Samarth Kulkarni',
        headline: 'Distributed Systems Architect & Espresso Crafter',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
        bio: 'Deep into cloud scalability and manual lever espresso machines. Looking for a modern 2BHK flatmate in Whitefield with clubhouse amenities.',
        budgetRange: { min: 22000, max: 34000, currency: 'INR' },
        preferredLocations: ['Whitefield, Bengaluru', 'ITPL Spine, Bengaluru'],
        visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Espresso Aficionado', 'High Tech', 'Modern Suites'],
        lifestyleDNA: { chronotype: 'balanced', cleanlinessLevel: 4, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Natasha Lobo',
        headline: 'Creative Director & Indie Game Developer',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        bio: 'Building narrative puzzle games. Need a quiet cottage room in Anjuna with natural garden air, fast WiFi, and respectful acoustic separation.',
        budgetRange: { min: 24000, max: 38000, currency: 'INR' },
        preferredLocations: ['Anjuna, Goa', 'Assagao, Goa', 'Vagator, Goa'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Game Studio', 'Garden Sanctuary', 'Creative Solitude'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 4, workStyle: 'remote', guestPolicy: 'flexible', petTolerance: ['dogs', 'cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Pranav Nambiar',
        headline: 'Aerospace Systems Engineer & Jazz Trumpeter',
        avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
        bio: 'Aerodynamics lead for eVTOL prototypes. Acoustic practice strictly in sound-isolated recording booths. Seeking flat in Domlur or Indiranagar.',
        budgetRange: { min: 18000, max: 28000, currency: 'INR' },
        preferredLocations: ['Domlur, Bengaluru', 'Indiranagar, Bengaluru'],
        visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Aviation Tech', 'Sound Isolation', 'Punctual Co-living'],
        lifestyleDNA: { chronotype: 'balanced', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Rhea Bhattacharya',
        headline: 'Bio-informatics Researcher & Classical Sitarist',
        avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
        bio: 'Analyzing genomic sequences at national labs. Love morning classical sitar riyaaz with practice mutes and a peaceful South Kolkata flat.',
        budgetRange: { min: 12000, max: 19000, currency: 'INR' },
        preferredLocations: ['Salt Lake, Kolkata', 'New Town, Kolkata'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Genomics Science', 'Classical Arts', 'Academic Focus'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 2, workStyle: 'hybrid', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Harshvardhan Rathore',
        headline: 'Cinematographer & Film Archivist',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        bio: 'Shooting long-form independent cinema. Looking for a high-ceiling sunlit loft in Juhu near the beach with darkroom workspace.',
        budgetRange: { min: 32000, max: 58000, currency: 'INR' },
        preferredLocations: ['Juhu, Mumbai', 'Versova, Mumbai'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Cinema Archivist', 'Beach Walk', 'High Ceiling Loft'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 4, workStyle: 'hybrid', guestPolicy: 'flexible', petTolerance: ['cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Tanvi Shenoy',
        headline: 'Typeface Designer & Heritage Walker',
        avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
        bio: 'Drawing Indic typography. Early morning filter coffee at CTR, quiet focus, and plant-filled balconies in Malleshwaram or Sadashivnagar.',
        budgetRange: { min: 17000, max: 26000, currency: 'INR' },
        preferredLocations: ['Malleshwaram, Bengaluru', 'Sadashivnagar, Bengaluru'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Heritage Bengaluru', 'Typography', 'Filter Coffee'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Aman Qureshi',
        headline: 'Marine Biologist & Coastal Photographer',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        bio: 'Researching coral restoration along the Coromandel coast. Quiet, minimalist habits, and clean shared living in Alwarpet.',
        budgetRange: { min: 15000, max: 24000, currency: 'INR' },
        preferredLocations: ['Alwarpet, Chennai', 'Mylapore, Chennai'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Marine Science', 'Coastal Culture', 'Minimalist'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'rarely', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Simran Sethi',
        headline: 'Renewable Energy Strategist & Tennis Player',
        avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
        bio: 'Working on solar micro-grid financing. 6:00 AM tennis workouts, clean meal preps, and respectful quiet living on Golf Course Road.',
        budgetRange: { min: 25000, max: 42000, currency: 'INR' },
        preferredLocations: ['Golf Course Road, Gurugram', 'DLF Phase 5, Gurugram'],
        visualTags: ['Aadhaar Verified', 'Early Riser', 'Tennis Athlete', 'Clean Tech', 'Structured Routines'],
        lifestyleDNA: { chronotype: 'early_bird', cleanlinessLevel: 5, socialEnergy: 4, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Omkar Gokhale',
        headline: 'Deep Tech Founder & Vinyl Audiophile',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        bio: 'Building autonomous robotics perception. Need an airy flat in Aundh or Baner with high electrical safety and quiet focus hours.',
        budgetRange: { min: 16000, max: 25000, currency: 'INR' },
        preferredLocations: ['Aundh, Pune', 'Baner, Pune'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Robotics Founder', 'Vinyl Sound', 'Quiet Tech'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'flexible', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Lavanya Reddy',
        headline: 'Genomics Data Scientist & Potter',
        avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
        bio: 'Crunching DNA sequences for personalized therapeutics. Love wheel pottery on weekends and clean organized living spaces in Gachibowli.',
        budgetRange: { min: 18000, max: 27000, currency: 'INR' },
        preferredLocations: ['Gachibowli, Hyderabad', 'Financial District, Hyderabad'],
        visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Genomics', 'Studio Pottery', 'Organized Living'],
        lifestyleDNA: { chronotype: 'balanced', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'hybrid', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
      {
        displayName: 'Farhan Mirza',
        headline: 'Screenwriter & Ocean Kayaker',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: 'Writing cinematic features for international festivals. Looking for a sea-facing room in Versova with calm breeze and creative synergy.',
        budgetRange: { min: 25000, max: 42000, currency: 'INR' },
        preferredLocations: ['Versova, Mumbai', 'Juhu, Mumbai'],
        visualTags: ['Aadhaar Verified', 'Night Owl', 'Screenwriting', 'Ocean Views', 'Creative Discipline'],
        lifestyleDNA: { chronotype: 'night_owl', cleanlinessLevel: 4, socialEnergy: 4, workStyle: 'remote', guestPolicy: 'flexible', petTolerance: ['cats', 'plants'], smokingTolerance: false },
      },
      {
        displayName: 'Arundhati Das',
        headline: 'Generative AI Artist & Urban Sketcher',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        bio: 'Blending traditional wash painting with diffusion models. Seeking a light-flooded modern apartment in New Town with expansive balcony views.',
        budgetRange: { min: 14000, max: 23000, currency: 'INR' },
        preferredLocations: ['New Town, Kolkata', 'Salt Lake, Kolkata'],
        visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Generative Art', 'Balcony Views', 'Thoughtful Living'],
        lifestyleDNA: { chronotype: 'balanced', cleanlinessLevel: 5, socialEnergy: 3, workStyle: 'remote', guestPolicy: 'weekends_only', petTolerance: ['plants'], smokingTolerance: false },
      },
    ];

    const createdProfiles = [];
    for (let i = 0; i < rawProfilesData.length; i++) {
      const pData = rawProfilesData[i];
      const user = createdUsers[i];
      const profile = await ProfileModel.create({
        userId: user._id,
        displayName: pData.displayName,
        headline: pData.headline,
        avatarUrl: pData.avatarUrl,
        bio: pData.bio,
        budgetRange: pData.budgetRange,
        preferredLocations: pData.preferredLocations,
        moveInDate: new Date('2026-04-01'),
        lifestyleDNA: pData.lifestyleDNA,
        visualTags: pData.visualTags,
      });
      createdProfiles.push(profile);
    }
    console.log(`[Seed] Seeded ${createdProfiles.length} Profiles.`);

    // =========================================================================
    // 3. SEED 12 CURATED INDIAN ROOMS (RoomModel)
    // =========================================================================
    const roomsSeedData = [
      {
        title: 'The Indiranagar Garden Studio',
        description: 'Sun-drenched private room with attached balcony and teakwood workspace in a curated 3BHK flat on 12th Main, Indiranagar.',
        address: { street: '428, 12th Main Rd, HAL 2nd Stage, Indiranagar', city: 'Bengaluru', state: 'Karnataka', coordinates: [77.6412, 12.9716] },
        pricing: { monthlyRent: 24000, deposit: 48000, utilitiesIncluded: false },
        photos: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ'],
        roommates: [{ userId: createdUsers[0]._id, roomAssigned: 'Garden Suite A', leaseEnd: new Date('2027-03-01') }],
        status: 'available',
      },
      {
        title: 'The Bandra Heritage Duplex',
        description: 'High-ceiling master room with vintage mosaic tiles and acoustic isolation in Ranwar Village, Bandra West.',
        address: { street: '18, Ranwar Village, Bandra West', city: 'Mumbai', state: 'Maharashtra', coordinates: [72.8295, 19.0596] },
        pricing: { monthlyRent: 32000, deposit: 64000, utilitiesIncluded: false },
        photos: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w'],
        roommates: [{ userId: createdUsers[1]._id, roomAssigned: 'Heritage Master Suite', leaseEnd: new Date('2027-01-01') }],
        status: 'available',
      },
      {
        title: 'The Baner Minimalist Sanctuary',
        description: 'Quiet, airy room facing the Pashan hill line. Modern kitchen, water purifier, and dedicated ergonomic workstation.',
        address: { street: 'Baner Rd, near Balewadi High Street', city: 'Pune', state: 'Maharashtra', coordinates: [73.7868, 18.5590] },
        pricing: { monthlyRent: 15500, deposit: 30000, utilitiesIncluded: true },
        photos: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A'],
        roommates: [{ userId: createdUsers[2]._id, roomAssigned: 'Hill View Room', leaseEnd: new Date('2027-02-01') }],
        status: 'available',
      },
      {
        title: 'The Hauz Khas Creative Loft',
        description: 'Artisan-designed penthouse room overlooking Hauz Khas forest line. Expansive natural lighting, timber bookshelves, and serene quietude.',
        address: { street: 'E-Block, Hauz Khas Enclave', city: 'Delhi', state: 'Delhi NCR', coordinates: [77.1945, 28.5494] },
        pricing: { monthlyRent: 26000, deposit: 50000, utilitiesIncluded: false },
        photos: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw'],
        roommates: [{ userId: createdUsers[7]._id, roomAssigned: 'Penthouse Loft Suite', leaseEnd: new Date('2027-05-01') }],
        status: 'available',
      },
      {
        title: 'The Assagao Portuguese Villa',
        description: 'Charming heritage room with laterite stone walls, high wooden ceilings, and garden verandah in Assagao, North Goa.',
        address: { street: 'Badem Lane, Assagao', city: 'Goa', state: 'Goa', coordinates: [73.7712, 15.5910] },
        pricing: { monthlyRent: 34000, deposit: 60000, utilitiesIncluded: true },
        photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[11]._id, roomAssigned: 'Portuguese Garden Suite', leaseEnd: new Date('2027-04-01') }],
        status: 'available',
      },
      {
        title: 'The Jubilee Hills Studio Suite',
        description: 'Architecturally designed room overlooking the Jubilee Hills rocky ridge. Floor-to-ceiling glass, acoustic curtains, and custom teak desk.',
        address: { street: 'Road 36, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', coordinates: [78.4068, 17.4319] },
        pricing: { monthlyRent: 28000, deposit: 56000, utilitiesIncluded: false },
        photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[6]._id, roomAssigned: 'Hill Ridge Suite', leaseEnd: new Date('2027-06-01') }],
        status: 'available',
      },
      {
        title: 'The Lavelle Road Garden Penthouse',
        description: 'Exclusive high-ceiling penthouse suite overlooking ancient raintrees in central Bengaluru. Pure heritage charm with modern amenities.',
        address: { street: 'Lavelle Road, Shanthala Nagar', city: 'Bengaluru', state: 'Karnataka', coordinates: [77.5975, 12.9719] },
        pricing: { monthlyRent: 42000, deposit: 84000, utilitiesIncluded: false },
        photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[25]._id, roomAssigned: 'Raintree Penthouse A', leaseEnd: new Date('2027-08-01') }],
        status: 'available',
      },
      {
        title: 'The Juhu Beachside Suite',
        description: 'Sunlit sea-breeze suite just 200 meters from Juhu Beach. Acoustic double glazing, Italian marble flooring, and private balcony.',
        address: { street: 'Juhu Tara Road, Juhu', city: 'Mumbai', state: 'Maharashtra', coordinates: [72.8258, 19.1028] },
        pricing: { monthlyRent: 45000, deposit: 90000, utilitiesIncluded: false },
        photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[24]._id, roomAssigned: 'Sea View Suite', leaseEnd: new Date('2027-09-01') }],
        status: 'available',
      },
      {
        title: 'The Cyber City Sky Loft',
        description: 'Panoramic 24th-floor room on Golf Course Road. Expansive Aravali forest views, central air purification, and concierge service.',
        address: { street: 'Golf Course Extension, Sector 54', city: 'Delhi', state: 'Delhi NCR', coordinates: [77.0878, 28.4595] },
        pricing: { monthlyRent: 29000, deposit: 58000, utilitiesIncluded: false },
        photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[14]._id, roomAssigned: 'Sky View Loft 24A', leaseEnd: new Date('2027-05-01') }],
        status: 'available',
      },
      {
        title: 'The Adyar Riverview Suite',
        description: 'Tranquil coastal room overlooking the Adyar river estuary. Breezy balconies, terracotta flooring, and peaceful silence.',
        address: { street: 'Gandhi Nagar, Adyar', city: 'Chennai', state: 'Tamil Nadu', coordinates: [80.2570, 13.0012] },
        pricing: { monthlyRent: 19500, deposit: 39000, utilitiesIncluded: true },
        photos: ['https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[5]._id, roomAssigned: 'Estuary Breeze Suite', leaseEnd: new Date('2027-03-01') }],
        status: 'available',
      },
      {
        title: 'The Ballygunge Art Studio',
        description: 'Classic South Kolkata rowhouse suite with high ceilings, louvered teak shutters, red oxide floors, and quiet courtyard.',
        address: { street: 'Dover Park, Ballygunge', city: 'Kolkata', state: 'West Bengal', coordinates: [88.3639, 22.5280] },
        pricing: { monthlyRent: 18000, deposit: 36000, utilitiesIncluded: true },
        photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[10]._id, roomAssigned: 'Courtyard Studio 1', leaseEnd: new Date('2027-07-01') }],
        status: 'available',
      },
      {
        title: 'The HSR Layout Creator Loft',
        description: 'Modern top-floor studio with private terrace garden, ergonomic setup, and direct natural lighting in HSR Sector 3.',
        address: { street: 'Sector 3, 14th Main, HSR Layout', city: 'Bengaluru', state: 'Karnataka', coordinates: [77.6387, 12.9121] },
        pricing: { monthlyRent: 23500, deposit: 47000, utilitiesIncluded: false },
        photos: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
        roommates: [{ userId: createdUsers[13]._id, roomAssigned: 'Attic Terrace Suite', leaseEnd: new Date('2027-04-01') }],
        status: 'available',
      },
    ];

    const createdRooms = [];
    for (const r of roomsSeedData) {
      const room = await RoomModel.create(r);
      createdRooms.push(room);
    }
    console.log(`[Seed] Seeded ${createdRooms.length} Curated Indian Rooms.`);

    // =========================================================================
    // 4. SEED LIVING AGREEMENT & ACTIVE STAY
    // =========================================================================
    const activeAgreement = await LivingAgreementModel.create({
      roomId: createdRooms[0]._id,
      residents: [createdUsers[0]._id, createdUsers[2]._id],
      rules: [
        {
          category: 'Finance',
          title: 'Rent & Utility Contribution',
          description: '₹18,500/mo split due by 5th via UPI to designated flat account.',
          agreedBy: [createdUsers[0]._id, createdUsers[2]._id],
        },
        {
          category: 'Rhythm',
          title: 'Quiet Hours Rhythm',
          description: '10:30 PM – 7:00 AM Daily. Headphones required in shared hall.',
          agreedBy: [createdUsers[0]._id, createdUsers[2]._id],
        },
        {
          category: 'Shared Spaces',
          title: 'Clean-As-You-Go Kitchen Routine',
          description: 'Quartz island wiped down immediately after cooking chai & meals.',
          agreedBy: [createdUsers[0]._id, createdUsers[2]._id],
        },
      ],
      quietHours: { start: '22:30', end: '07:00' },
      status: 'active',
      signedAt: new Date('2026-03-01'),
    });

    const activeStay = await StayModel.create({
      roomId: createdRooms[0]._id,
      participants: [createdUsers[0]._id, createdUsers[2]._id],
      startDate: new Date('2026-03-01'),
      endDate: new Date('2027-03-01'),
      status: 'active',
      verified: true,
      agreementId: activeAgreement._id,
    });
    console.log('[Seed] Seeded Active Stay & Living Agreement.');

    // =========================================================================
    // 5. SEED SHARED EXPENSES
    // =========================================================================
    await ExpenseModel.create([
      {
        roomId: createdRooms[0]._id,
        payerId: createdUsers[0]._id,
        title: 'ACT Gigabit Fiber Internet (300 Mbps)',
        amount: 1499,
        category: 'utilities',
        splits: [
          { userId: createdUsers[0]._id, amountOwed: 749.5, isSettled: true, settledAt: new Date() },
          { userId: createdUsers[2]._id, amountOwed: 749.5, isSettled: true, settledAt: new Date() },
        ],
        dueDate: new Date('2026-04-10'),
      },
      {
        roomId: createdRooms[0]._id,
        payerId: createdUsers[0]._id,
        title: 'Nature Basket Organic Groceries & Staples',
        amount: 2850,
        category: 'groceries',
        splits: [
          { userId: createdUsers[0]._id, amountOwed: 1425, isSettled: true, settledAt: new Date() },
          { userId: createdUsers[2]._id, amountOwed: 1425, isSettled: false },
        ],
        dueDate: new Date('2026-04-15'),
      },
    ]);
    console.log('[Seed] Seeded Expenses.');

    // =========================================================================
    // 6. SEED TRUST PROFILES
    // =========================================================================
    await TrustProfileModel.create([
      {
        userId: createdUsers[0]._id,
        verificationTier: 'kinship_certified',
        reputationScore: 940,
        verifications: {
          governmentId: { verified: true, verifiedAt: new Date('2026-01-10') },
          employmentProof: { verified: true, employer: 'Studio Vistara', verifiedAt: new Date('2026-01-12') },
          creditConfidence: { tier: 'Tier 1 Prime', verifiedAt: new Date('2026-01-15') },
        },
      },
      {
        userId: createdUsers[1]._id,
        verificationTier: 'background_cleared',
        reputationScore: 920,
        verifications: {
          governmentId: { verified: true, verifiedAt: new Date('2026-01-15') },
          employmentProof: { verified: true, employer: 'Fintech Corp', verifiedAt: new Date('2026-01-18') },
          creditConfidence: { tier: 'Tier 1 Prime', verifiedAt: new Date('2026-01-20') },
        },
      },
    ]);
    console.log('[Seed] Seeded Trust Profiles.');

    // =========================================================================
    // 7. SEED MATCHES
    // =========================================================================
    await MatchModel.create([
      {
        initiatorId: createdUsers[0]._id,
        targetUserId: createdUsers[2]._id,
        roomId: createdRooms[0]._id,
        overallScore: 98,
        breakdown: { sleepSync: 96, cleanlinessAlignment: 100, socialHarmony: 94, financialFit: 98 },
        connectionInsights: [
          'Shared early morning routine (6:30 AM filter coffee).',
          'Strict adherence to 10:30 PM quiet hours.',
          'Identical 5/5 cleanliness expectation for kitchen surfaces.',
        ],
        status: 'revealed',
        unlockedAt: new Date('2026-03-01'),
      },
      {
        initiatorId: createdUsers[1]._id,
        targetUserId: createdUsers[4]._id,
        roomId: createdRooms[1]._id,
        overallScore: 91,
        breakdown: { sleepSync: 88, cleanlinessAlignment: 94, socialHarmony: 92, financialFit: 90 },
        connectionInsights: [
          'Acoustic vinyl appreciation and respectful focus hours.',
          'Mutual specialty coffee brewing routines.',
        ],
        status: 'revealed',
        unlockedAt: new Date('2026-03-05'),
      },
    ]);
    console.log('[Seed] Seeded Matches.');

    // =========================================================================
    // 8. SEED CONVERSATIONS & MESSAGES
    // =========================================================================
    const conversation = await ConversationModel.create({
      participants: [createdUsers[0]._id, createdUsers[2]._id],
      context: { roomId: createdRooms[0]._id },
      lastMessageAt: new Date(),
    });

    await MessageModel.create([
      {
        conversationId: conversation._id,
        senderId: createdUsers[0]._id,
        content: 'Hi Rohan! The sunlit workspace in the Indiranagar studio looks perfect for morning focus.',
        attachments: [],
        readBy: [createdUsers[0]._id, createdUsers[2]._id],
      },
      {
        conversationId: conversation._id,
        senderId: createdUsers[2]._id,
        content: 'Hey Ananya! Absolutely. I am on 300 Mbps fiber and morning quiet hours suit my research schedule.',
        attachments: [],
        readBy: [createdUsers[0]._id, createdUsers[2]._id],
      },
    ]);
    console.log('[Seed] Seeded Conversation & Messages.');

    // =========================================================================
    // 9. SEED REVIEWS
    // =========================================================================
    await ReviewModel.create({
      reviewerId: createdUsers[2]._id,
      revieweeId: createdUsers[0]._id,
      stayId: activeStay._id,
      roomId: createdRooms[0]._id,
      overallRating: 5,
      cleanlinessRating: 5,
      communicationRating: 5,
      respectRating: 5,
      noiseRating: 5,
      comment: 'Exceptional cohabitant. Flawless kitchen hygiene, zero noise disruptions, and genuine mutual respect.',
      verifiedStay: true,
      reported: false,
      status: 'approved',
    });
    console.log('[Seed] Seeded Review.');

    // =========================================================================
    // 10. SEED 8 METROPOLITAN DESTINATIONS (DestinationModel)
    // =========================================================================
    await DestinationModel.create([
      {
        city: 'Bengaluru',
        country: 'India',
        availableRoomsCount: 24,
        communityCount: 420,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
      },
      {
        city: 'Mumbai',
        country: 'India',
        availableRoomsCount: 18,
        communityCount: 520,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
      },
      {
        city: 'Pune',
        country: 'India',
        availableRoomsCount: 16,
        communityCount: 280,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
      },
      {
        city: 'Delhi NCR',
        country: 'India',
        availableRoomsCount: 20,
        communityCount: 390,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
      },
      {
        city: 'Hyderabad',
        country: 'India',
        availableRoomsCount: 15,
        communityCount: 260,
        heroImageUrl:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      },
      {
        city: 'Goa',
        country: 'India',
        availableRoomsCount: 12,
        communityCount: 210,
        heroImageUrl:
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      },
      {
        city: 'Chennai',
        country: 'India',
        availableRoomsCount: 14,
        communityCount: 240,
        heroImageUrl:
          'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
      },
      {
        city: 'Kolkata',
        country: 'India',
        availableRoomsCount: 16,
        communityCount: 290,
        heroImageUrl:
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      },
    ]);
    console.log('[Seed] Seeded 8 Metropolitan Destinations.');

    console.log('[Seed] Full 32+ profile and 12+ room Indian development dataset seeded successfully into MongoDB!');
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    throw error;
  } finally {
    if (disconnectAfter) {
      await mongoose.disconnect();
      console.log('[Seed] Disconnected from MongoDB.');
    }
  }
};

// If run directly via node/tsx
if (process.argv[1]?.includes('seed')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
