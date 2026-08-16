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
    // 1. SEED AUTHENTIC INDIAN USERS (UserModel)
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

    const [uAnanya, uAarav, uRohan, uIshita, uAditya, uMeera, uArjun, uKavya, uRahul, uSneha] = createdUsers;
    console.log(`[Seed] Seeded ${createdUsers.length} Users.`);

    // =========================================================================
    // 2. SEED PROFILES & LIFESTYLE DNA (ProfileModel)
    // =========================================================================
    const profilesSeedData = [
      {
        userId: uAnanya._id,
        displayName: 'Ananya Sharma',
        headline: 'Spatial Architect & Ceramicist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
        bio: 'Seeking a serene, sunlit sanctuary in Indiranagar. Morning filter coffee ritual, strict quiet hours after 10:30 PM, and mindful shared kitchen cleanliness.',
        budgetRange: { min: 18000, max: 28000, currency: 'INR' },
        preferredLocations: ['Indiranagar, Bengaluru', 'Domlur, Bengaluru'],
        moveInDate: new Date('2026-04-01'),
        lifestyleDNA: {
          chronotype: 'early_bird' as const,
          cleanlinessLevel: 5,
          socialEnergy: 3,
          workStyle: 'hybrid' as const,
          guestPolicy: 'weekends_only' as const,
          petTolerance: ['plants'],
          smokingTolerance: false,
        },
        visualTags: ['Early Riser', 'Architectural Digest', 'Quiet Focus', 'ID Verified'],
      },
      {
        userId: uAarav._id,
        displayName: 'Aarav Mehta',
        headline: 'Fintech Product Lead & Vinyl Collector',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAkrXIOQFr_z5E9eGhR9o5GdKIcRJItc5Va0e1s6Pvi2gJW9HstlN__2qqmol8Whb70aPTmU4TPWCvRGbOLjD7wwEDKCt9NMueejAZcpY_mEO-mVGei_3MiHaDq5qLMbEq_gHwvIm6BryawU0LrRMqY-zn1f7WInRW9Ktgdy5sP7qxlaFJIIM0_XJYflVqkUCxY7NYBnJkV6MHSa6RydvmAFN5TiOLhpZP7hGmsrkBOtAB1YJZSX8hYIg',
        bio: 'Focused on disciplined routines and acoustic harmony in Bandra West. Passionate about sourdough baking, ambient focus music, and pristine countertops.',
        budgetRange: { min: 22000, max: 35000, currency: 'INR' },
        preferredLocations: ['Bandra West, Mumbai', 'Khar West, Mumbai'],
        moveInDate: new Date('2026-04-15'),
        lifestyleDNA: {
          chronotype: 'flexible' as const,
          cleanlinessLevel: 5,
          socialEnergy: 2,
          workStyle: 'wfh_full' as const,
          guestPolicy: 'rarely' as const,
          petTolerance: ['cats'],
          smokingTolerance: false,
        },
        visualTags: ['Acoustic Discipline', 'Meticulous Clean', 'Tier 1 Credit'],
      },
      {
        userId: uRohan._id,
        displayName: 'Rohan Patil',
        headline: 'AI Research Scientist & Cyclist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
        bio: 'Living in Baner, Pune. Weekday deep-work focus from 8 AM, weekend trail riding, and zero clutter in shared living zones.',
        budgetRange: { min: 12000, max: 20000, currency: 'INR' },
        preferredLocations: ['Baner, Pune', 'Balewadi, Pune', 'Aundh, Pune'],
        moveInDate: new Date('2026-05-01'),
        lifestyleDNA: {
          chronotype: 'early_bird' as const,
          cleanlinessLevel: 4,
          socialEnergy: 3,
          workStyle: 'hybrid' as const,
          guestPolicy: 'weekends_only' as const,
          petTolerance: ['dogs'],
          smokingTolerance: false,
        },
        visualTags: ['Early Bird', 'Tech Resident', 'Fitness Discipline'],
      },
      {
        userId: uIshita._id,
        displayName: 'Ishita Nair',
        headline: 'Editorial Curator & Tea Sommelier',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
        bio: 'Balancing design research between Bengaluru and Kochi. Value quiet evenings with books, natural airflow, and respectful kitchen rotations.',
        budgetRange: { min: 16000, max: 26000, currency: 'INR' },
        preferredLocations: ['Koramangala, Bengaluru', 'HSR Layout, Bengaluru'],
        moveInDate: new Date('2026-04-10'),
        lifestyleDNA: {
          chronotype: 'early_bird' as const,
          cleanlinessLevel: 5,
          socialEnergy: 2,
          workStyle: 'hybrid' as const,
          guestPolicy: 'rarely' as const,
          petTolerance: ['plants'],
          smokingTolerance: false,
        },
        visualTags: ['Mindful Living', 'Quiet Evenings', 'Verified Cohabitant'],
      },
      {
        userId: uAditya._id,
        displayName: 'Aditya Kulkarni',
        headline: 'Brand Strategist & Specialty Coffee Roaster',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
        bio: 'Looking for a spacious flat in Koregaon Park, Pune. Value good acoustics, plant-filled balconies, and structured utility bill splits.',
        budgetRange: { min: 14000, max: 24000, currency: 'INR' },
        preferredLocations: ['Koregaon Park, Pune', 'Kalyani Nagar, Pune'],
        moveInDate: new Date('2026-05-01'),
        lifestyleDNA: {
          chronotype: 'flexible' as const,
          cleanlinessLevel: 4,
          socialEnergy: 3,
          workStyle: 'hybrid' as const,
          guestPolicy: 'weekends_only' as const,
          petTolerance: ['cats', 'dogs'],
          smokingTolerance: false,
        },
        visualTags: ['Coffee Rituals', 'ID Cleared', 'Orderly Common Spaces'],
      },
      {
        userId: uMeera._id,
        displayName: 'Meera Iyer',
        headline: 'Design Systems Lead & Classical Vocalist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC64MbZWsNixcO8McDmNx9O0u22et38koHfzkR1L85nrNCbb5YIzzL6EMVp-HSbJhTQZQIgd_4WaL4w32CrGIgitEkcxxzRW-x-JQAf6rlgr-YzwwE8OYl8iut1Rz_pGMddRzECyh7vPq13cQSlOi5I8C-1wQqo8w9tl5PULqqKuweX89oMHAbseGsUMo0Lbj6JDZU5h4I5k0KmXmVqZMOGnpn_fd63AIUCd4gCyPkqW69Njzrwm3lCYA',
        bio: 'Based in Adyar, Chennai. Morning riyaaz with headphones, disciplined workspace, and clear shared house agreements.',
        budgetRange: { min: 15000, max: 25000, currency: 'INR' },
        preferredLocations: ['Adyar, Chennai', 'Besant Nagar, Chennai'],
        moveInDate: new Date('2026-04-20'),
        lifestyleDNA: {
          chronotype: 'early_bird' as const,
          cleanlinessLevel: 5,
          socialEnergy: 2,
          workStyle: 'wfh_full' as const,
          guestPolicy: 'rarely' as const,
          petTolerance: ['plants'],
          smokingTolerance: false,
        },
        visualTags: ['Early Bird', 'Cultural Rituals', 'Clean Spaces'],
      },
      {
        userId: uArjun._id,
        displayName: 'Arjun Rao',
        headline: 'Senior Cloud Architect',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
        bio: 'Working out of Hitec City, Hyderabad. Minimalist setup, punctual rent transfers, and weekend cooking experiments.',
        budgetRange: { min: 14000, max: 22000, currency: 'INR' },
        preferredLocations: ['Madhapur, Hyderabad', 'Gachibowli, Hyderabad'],
        moveInDate: new Date('2026-05-15'),
        lifestyleDNA: {
          chronotype: 'flexible' as const,
          cleanlinessLevel: 4,
          socialEnergy: 2,
          workStyle: 'office_only' as const,
          guestPolicy: 'rarely' as const,
          petTolerance: ['none'],
          smokingTolerance: false,
        },
        visualTags: ['Tech Cohabitant', 'Punctual Ledger', 'Quiet Living'],
      },
      {
        userId: uKavya._id,
        displayName: 'Kavya Menon',
        headline: 'Documentary Filmmaker & Writer',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBP--n4jsuUg_QhblCugKGaXaEIg45fGdVCQAMMLBFvT-MaK1wjykvVFcCyCFt7AEXrc8hxeRBUVIXDUs21-ZzBQmykP3998CrxKyfNZcxbpBL-5W5bi5naAsUM6G9RPm3ohmHlkIoNkiDk4iBle7T0afKZksl3KR77cqfGUBQQBJ8IkvXkf5e4Elc55SUw85e1EI2VgjGOsvjnfIKaPcS4Dofp_36j3SWhCeniG_jBRN7pIdW9BNr1eQ',
        bio: 'Exploring residential narratives in Hauz Khas, Delhi. Love natural lighting, quiet reading corners, and structured chore rotations.',
        budgetRange: { min: 18000, max: 28000, currency: 'INR' },
        preferredLocations: ['Hauz Khas, Delhi', 'Saket, Delhi', 'Green Park, Delhi'],
        moveInDate: new Date('2026-04-01'),
        lifestyleDNA: {
          chronotype: 'early_bird' as const,
          cleanlinessLevel: 5,
          socialEnergy: 3,
          workStyle: 'hybrid' as const,
          guestPolicy: 'weekends_only' as const,
          petTolerance: ['plants', 'cats'],
          smokingTolerance: false,
        },
        visualTags: ['Creative Sanctuary', 'Verified Resident', 'Quiet Nights'],
      },
      {
        userId: uRahul._id,
        displayName: 'Rahul Deshmukh',
        headline: 'Acoustics Engineer & Podcaster',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBALxpFa4YiBPqIYIB48o1H5Gr4Ze9OOCo5WX71jmokjiq3VCz7K0hgIHNTkTG3cjojinKawK0M3xpkx6WiH9Nldgg0VO9JSSATIPrYdCcdRTWikfOVypndm4IjfIeEItDOQM7Znk22vvlL7IwbZeoADMPyi_iMnQG_ucA-leaZaam4SA_5PykGhxdsq7edDZFZmz2TCh6b4Y15FRrYriSDIv6cXhzxXtxgfhHeSz2cGa8SYADbgtoYMw',
        bio: 'Sound designer in Dadar, Mumbai. Studio-calibrated headphones for late sessions, spotless kitchen counter discipline, and peaceful cohabitation.',
        budgetRange: { min: 20000, max: 32000, currency: 'INR' },
        preferredLocations: ['Dadar West, Mumbai', 'Prabhadevi, Mumbai'],
        moveInDate: new Date('2026-05-01'),
        lifestyleDNA: {
          chronotype: 'flexible' as const,
          cleanlinessLevel: 5,
          socialEnergy: 2,
          workStyle: 'hybrid' as const,
          guestPolicy: 'rarely' as const,
          petTolerance: ['none'],
          smokingTolerance: false,
        },
        visualTags: ['Acoustic Expert', 'Clean Countertops', 'Punctual Payer'],
      },
      {
        userId: uSneha._id,
        displayName: 'Sneha Kapoor',
        headline: 'Contemporary Ceramicist & Urban Botanist',
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCv3pDIQktysIEhj9VSO4UN7MfEUtlnZD4t7t5lJ7KUkCEvy-3Vd7JJWOrtMK-YjGfORSj2CDgySDSLJgok8M42KGxQrzmiTg6GEIIs6VpfeYYf1v_jhxMbRiyfzMqHYmeAnXlaTywmXQ3eCSnOACEXtGeKjB4qJttRugMlb2VtsQBKH8JRWbGRI4fV1hSdMX6d6TB5t2mCOOKdOGeDR-dJVYJ9lRl1WpWZKf3l-xsdCu_VC8VqJus51Q',
        bio: 'Creating pottery and propagating plants in Greater Kailash, Delhi. Early riser, respectful of shared silence, loves morning botanical tea rituals.',
        budgetRange: { min: 17000, max: 27000, currency: 'INR' },
        preferredLocations: ['Greater Kailash, Delhi', 'Defence Colony, Delhi'],
        moveInDate: new Date('2026-04-15'),
        lifestyleDNA: {
          chronotype: 'early_bird' as const,
          cleanlinessLevel: 5,
          socialEnergy: 3,
          workStyle: 'hybrid' as const,
          guestPolicy: 'weekends_only' as const,
          petTolerance: ['plants', 'cats'],
          smokingTolerance: false,
        },
        visualTags: ['Botanical Living', 'Tea Rituals', 'Verified Cohabitant'],
      },
    ];

    for (const p of profilesSeedData) {
      await ProfileModel.create(p);
    }
    console.log(`[Seed] Seeded ${profilesSeedData.length} Profiles.`);

    // =========================================================================
    // 3. SEED INDIAN ROOMS (RoomModel)
    // =========================================================================
    const roomIndiranagar = await RoomModel.create({
      title: 'The Indiranagar Garden Studio',
      description:
        'Sun-drenched private room with attached balcony and teakwood workspace in a curated 3BHK flat on 12th Main, Indiranagar.',
      address: {
        street: '428, 12th Main Rd, HAL 2nd Stage, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        coordinates: [77.6412, 12.9784],
      },
      pricing: {
        monthlyRent: 24000,
        deposit: 48000,
        utilitiesIncluded: false,
      },
      spatialModel: {
        modelUrl: '/models/default_room.glb',
        dimensions: { width: 14, length: 18, height: 10, unit: 'ft' },
        defaultCamera: { position: [0, 6, 9], target: [0, 0, 0] },
        layers: [
          { layerId: 'l1', name: 'Furniture', meshIds: ['bed_1', 'desk_1'], defaultVisible: true },
          { layerId: 'l2', name: 'Lighting', meshIds: ['lamp_1'], defaultVisible: true },
        ],
      },
      photos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
      ],
      roommates: [
        { userId: uAnanya._id, roomAssigned: 'Garden Suite A', leaseEnd: new Date('2027-03-01') },
        { userId: uRohan._id, roomAssigned: 'Balcony Suite B', leaseEnd: new Date('2027-03-01') },
      ],
      status: 'available',
    });

    const roomBandra = await RoomModel.create({
      title: 'The Bandra Heritage Duplex',
      description:
        'High-ceiling master room with vintage mosaic tiles and acoustic isolation in Pali Hill, Bandra West.',
      address: {
        street: '18, Pali Hill Rd, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        coordinates: [72.8258, 19.0607],
      },
      pricing: {
        monthlyRent: 32000,
        deposit: 64000,
        utilitiesIncluded: false,
      },
      spatialModel: {
        modelUrl: '/models/default_room.glb',
        dimensions: { width: 16, length: 20, height: 11, unit: 'ft' },
        defaultCamera: { position: [0, 6, 9], target: [0, 0, 0] },
        layers: [
          { layerId: 'l1', name: 'Master Suite', meshIds: ['bed_master'], defaultVisible: true },
        ],
      },
      photos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
      ],
      roommates: [
        { userId: uAarav._id, roomAssigned: 'Vintage Mosaic Room', leaseEnd: new Date('2027-01-01') },
      ],
      status: 'available',
    });

    const roomBaner = await RoomModel.create({
      title: 'The Baner Minimalist Sanctuary',
      description:
        'Quiet, airy room facing the Pashan hill line. Modern kitchen, water purifier, and dedicated ergonomic workstation.',
      address: {
        street: 'Baner Rd, near Balewadi High Street',
        city: 'Pune',
        state: 'Maharashtra',
        coordinates: [73.7868, 18.5590],
      },
      pricing: {
        monthlyRent: 15500,
        deposit: 30000,
        utilitiesIncluded: true,
      },
      photos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
      ],
      roommates: [],
      status: 'available',
    });

    const roomHauzKhas = await RoomModel.create({
      title: 'The Hauz Khas Creative Loft',
      description:
        'Artisan-designed penthouse room overlooking Hauz Khas forest line. Expansive natural lighting, timber bookshelves, and serene quietude.',
      address: {
        street: 'E-Block, Hauz Khas Enclave',
        city: 'Delhi',
        state: 'Delhi NCR',
        coordinates: [77.2065, 28.5494],
      },
      pricing: {
        monthlyRent: 26000,
        deposit: 50000,
        utilitiesIncluded: false,
      },
      photos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
      ],
      roommates: [
        { userId: uKavya._id, roomAssigned: 'Penthouse Loft Suite', leaseEnd: new Date('2027-05-01') },
      ],
      status: 'available',
    });

    console.log('[Seed] Seeded 4 Indian Rooms.');

    // =========================================================================
    // 4. SEED LIVING AGREEMENT (LivingAgreementModel)
    // =========================================================================
    const activeAgreement = await LivingAgreementModel.create({
      roomId: roomIndiranagar._id,
      residents: [uAnanya._id, uRohan._id],
      rules: [
        {
          category: 'Finance',
          title: 'Rent & Utility Contribution',
          description: '₹18,500/mo split due by 5th via UPI to designated flat account.',
          agreedBy: [uAnanya._id, uRohan._id],
        },
        {
          category: 'Rhythm',
          title: 'Quiet Hours Rhythm',
          description: '10:30 PM – 7:00 AM Daily. Headphones required in shared hall.',
          agreedBy: [uAnanya._id, uRohan._id],
        },
        {
          category: 'Shared Spaces',
          title: 'Clean-As-You-Go Kitchen Routine',
          description: 'Quartz island wiped down immediately after cooking chai & meals.',
          agreedBy: [uAnanya._id, uRohan._id],
        },
      ],
      quietHours: { start: '22:30', end: '07:00' },
      status: 'active',
      signedAt: new Date('2026-03-01'),
    });
    console.log('[Seed] Seeded Living Agreement.');

    // =========================================================================
    // 5. SEED ACTIVE STAY (StayModel)
    // =========================================================================
    const activeStay = await StayModel.create({
      roomId: roomIndiranagar._id,
      participants: [uAnanya._id, uRohan._id],
      startDate: new Date('2026-03-01'),
      endDate: new Date('2027-03-01'),
      status: 'active',
      verified: true,
      agreementId: activeAgreement._id,
    });
    console.log('[Seed] Seeded Active Stay.');

    // =========================================================================
    // 6. SEED EXPENSES (ExpenseModel)
    // =========================================================================
    await ExpenseModel.create([
      {
        roomId: roomIndiranagar._id,
        payerId: uAnanya._id,
        title: 'Nature’s Basket Organic Essentials',
        amount: 2850,
        category: 'groceries',
        splits: [
          { userId: uRohan._id, amountOwed: 950, isSettled: false },
        ],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        roomId: roomIndiranagar._id,
        payerId: uRohan._id,
        title: 'Airtel Gigabit Fiber Internet (300 Mbps)',
        amount: 1499,
        category: 'utilities',
        splits: [
          { userId: uAnanya._id, amountOwed: 749.5, isSettled: true, settledAt: new Date() },
        ],
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log('[Seed] Seeded Shared Expenses.');

    // =========================================================================
    // 7. SEED TRUST PROFILES (TrustProfileModel)
    // =========================================================================
    await TrustProfileModel.create([
      {
        userId: uAnanya._id,
        verificationTier: 'kinship_certified',
        reputationScore: 980,
        verifications: {
          governmentId: { verified: true, verifiedAt: new Date('2025-01-15') },
          employmentProof: { verified: true, employer: 'Studio Urban Spatial', verifiedAt: new Date('2025-02-01') },
          creditConfidence: { tier: 'Tier 1 (Experian 820+)', verifiedAt: new Date('2025-01-20') },
        },
      },
      {
        userId: uAarav._id,
        verificationTier: 'kinship_certified',
        reputationScore: 960,
        verifications: {
          governmentId: { verified: true, verifiedAt: new Date('2025-02-10') },
          employmentProof: { verified: true, employer: 'Fintech Capital Mumbai', verifiedAt: new Date('2025-02-15') },
          creditConfidence: { tier: 'Tier 1 (CIBIL 840+)', verifiedAt: new Date('2025-02-12') },
        },
      },
      {
        userId: uRohan._id,
        verificationTier: 'background_cleared',
        reputationScore: 950,
        verifications: {
          governmentId: { verified: true, verifiedAt: new Date('2025-03-01') },
          employmentProof: { verified: true, employer: 'AI Labs India', verifiedAt: new Date('2025-03-05') },
          creditConfidence: { tier: 'Tier 1 (CIBIL 790+)', verifiedAt: new Date('2025-03-02') },
        },
      },
    ]);
    console.log('[Seed] Seeded Trust Profiles.');

    // =========================================================================
    // 8. SEED MATCHES (MatchModel)
    // =========================================================================
    await MatchModel.create([
      {
        initiatorId: uAnanya._id,
        targetUserId: uRohan._id,
        roomId: roomIndiranagar._id,
        overallScore: 94,
        breakdown: {
          sleepSync: 96,
          cleanlinessAlignment: 98,
          socialHarmony: 90,
          financialFit: 92,
        },
        connectionInsights: [
          'Shared early bird chronotype (6:30 AM risers).',
          'Aesthetic order: strict shared kitchen cleanliness alignment.',
          'Punctual UPI ledger & split habits.',
        ],
        status: 'mutual_interest',
        unlockedAt: new Date('2026-03-01'),
      },
      {
        initiatorId: uAarav._id,
        targetUserId: uAditya._id,
        roomId: roomBandra._id,
        overallScore: 91,
        breakdown: {
          sleepSync: 88,
          cleanlinessAlignment: 94,
          socialHarmony: 92,
          financialFit: 90,
        },
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
    // 9. SEED CONVERSATIONS & MESSAGES (ConversationModel, MessageModel)
    // =========================================================================
    const conversation = await ConversationModel.create({
      participants: [uAnanya._id, uRohan._id],
      context: {
        roomId: roomIndiranagar._id,
      },
      lastMessageAt: new Date(),
    });

    await MessageModel.create([
      {
        conversationId: conversation._id,
        senderId: uAnanya._id,
        content: 'Hi Rohan! The sunlit workspace in the Indiranagar studio looks perfect for morning focus.',
        attachments: [],
        readBy: [uAnanya._id, uRohan._id],
      },
      {
        conversationId: conversation._id,
        senderId: uRohan._id,
        content: 'Hey Ananya! Absolutely. I am on 300 Mbps fiber and morning quiet hours suit my research schedule.',
        attachments: [],
        readBy: [uAnanya._id, uRohan._id],
      },
    ]);
    console.log('[Seed] Seeded Conversation & Messages.');

    // =========================================================================
    // 10. SEED REVIEWS (ReviewModel)
    // =========================================================================
    await ReviewModel.create({
      reviewerId: uRohan._id,
      revieweeId: uAnanya._id,
      stayId: activeStay._id,
      roomId: roomIndiranagar._id,
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
    // 11. SEED DESTINATIONS (DestinationModel)
    // =========================================================================
    await DestinationModel.create([
      {
        city: 'Bengaluru',
        country: 'India',
        availableRoomsCount: 14,
        communityCount: 320,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
      },
      {
        city: 'Mumbai',
        country: 'India',
        availableRoomsCount: 18,
        communityCount: 450,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
      },
      {
        city: 'Pune',
        country: 'India',
        availableRoomsCount: 10,
        communityCount: 210,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
      },
      {
        city: 'Delhi NCR',
        country: 'India',
        availableRoomsCount: 12,
        communityCount: 280,
        heroImageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
      },
    ]);
    console.log('[Seed] Seeded Destinations.');

    console.log('[Seed] Authentic India-first development dataset seeded successfully!');
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
