import { Profile } from '../types/index.js';

export interface IndianStayData {
  id: string;
  title: string;
  neighborhood: string;
  city: string;
  state: string;
  daysActive: number;
  status: 'active' | 'completed';
  address: string;
  cohabitants: {
    id: string;
    name: string;
    avatarUrl: string;
    role: string;
    cleanlinessScore: number;
  }[];
  todayResponsibilities: {
    id: string;
    title: string;
    assignee: string;
    description: string;
    status: 'pending' | 'completed';
    urgent?: boolean;
    costINR?: number;
  }[];
  financialEquilibrium: {
    userBalance: number;
    currency: string;
    breakdown: { name: string; reason: string; amount: number }[];
  };
}

export interface DemoExpenseItem {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  category: 'Groceries' | 'Utilities' | 'Supplies' | 'Maintenance';
  date: string;
  userShare: number;
  status: 'Pending' | 'Settled';
}

export interface DemoRoomItem {
  id: string;
  title: string;
  description: string;
  neighborhood: string;
  city: string;
  state: string;
  monthlyRent: number;
  deposit: number;
  roomType: string;
  furnishing: string;
  amenities: string[];
  imageUrl: string;
  galleryImages?: { url: string; title: string; category: string }[];
  cohabitants: string[];
  isAvailable: boolean;
}

export const INDIAN_DEMO_PROFILES: Profile[] = [
  {
    id: 'ananya-sharma',
    userId: 'user-ananya',
    displayName: 'Ananya Sharma',
    headline: 'Spatial Architect & Ceramicist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
    bio: 'Seeking a serene, sunlit sanctuary in Indiranagar. Morning filter coffee ritual, strict quiet hours after 10:30 PM, and mindful shared kitchen cleanliness.',
    budgetRange: { min: 18000, max: 28000, currency: 'INR' },
    preferredLocations: ['Indiranagar, Bengaluru', 'Domlur, Bengaluru'],
    visualTags: ['Early Riser', 'Architectural Digest', 'Quiet Focus', 'ID Verified'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'aarav-mehta',
    userId: 'user-aarav',
    displayName: 'Aarav Mehta',
    headline: 'Fintech Product Lead & Vinyl Collector',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkrXIOQFr_z5E9eGhR9o5GdKIcRJItc5Va0e1s6Pvi2gJW9HstlN__2qqmol8Whb70aPTmU4TPWCvRGbOLjD7wwEDKCt9NMueejAZcpY_mEO-mVGei_3MiHaDq5qLMbEq_gHwvIm6BryawU0LrRMqY-zn1f7WInRW9Ktgdy5sP7qxlaFJIIM0_XJYflVqkUCxY7NYBnJkV6MHSa6RydvmAFN5TiOLhpZP7hGmsrkBOtAB1YJZSX8hYIg',
    bio: 'Focused on disciplined routines and acoustic harmony in Bandra West. Passionate about sourdough baking, ambient focus music, and pristine countertops.',
    budgetRange: { min: 22000, max: 35000, currency: 'INR' },
    preferredLocations: ['Bandra West, Mumbai', 'Khar West, Mumbai'],
    visualTags: ['Acoustic Discipline', 'Meticulous Clean', 'Tier 1 Credit'],
    lifestyleDNA: {
      chronotype: 'flexible',
      cleanlinessLevel: 5,
      socialEnergy: 2,
      workStyle: 'wfh_full',
      guestPolicy: 'rarely',
      petTolerance: ['cats'],
      smokingTolerance: false,
    },
  },
  {
    id: 'rohan-patil',
    userId: 'user-rohan',
    displayName: 'Rohan Patil',
    headline: 'AI Research Scientist & Cyclist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
    bio: 'Living in Baner, Pune. Weekday deep-work focus from 8 AM, weekend trail riding, and zero clutter in shared living zones.',
    budgetRange: { min: 12000, max: 20000, currency: 'INR' },
    preferredLocations: ['Baner, Pune', 'Balewadi, Pune', 'Aundh, Pune'],
    visualTags: ['Early Bird', 'Tech Resident', 'Fitness Discipline'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['dogs'],
      smokingTolerance: false,
    },
  },
  {
    id: 'ishita-nair',
    userId: 'user-ishita',
    displayName: 'Ishita Nair',
    headline: 'Editorial Curator & Tea Sommelier',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
    bio: 'Balancing design research between Bengaluru and Kochi. Value quiet evenings with books, natural airflow, and respectful kitchen rotations.',
    budgetRange: { min: 16000, max: 26000, currency: 'INR' },
    preferredLocations: ['Koramangala, Bengaluru', 'HSR Layout, Bengaluru'],
    visualTags: ['Mindful Living', 'Quiet Evenings', 'Verified Cohabitant'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 2,
      workStyle: 'hybrid',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'aditya-kulkarni',
    userId: 'user-aditya',
    displayName: 'Aditya Kulkarni',
    headline: 'Brand Strategist & Specialty Coffee Roaster',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
    bio: 'Looking for a spacious flat in Koregaon Park, Pune. Value good acoustics, plant-filled balconies, and structured utility bill splits.',
    budgetRange: { min: 14000, max: 24000, currency: 'INR' },
    preferredLocations: ['Koregaon Park, Pune', 'Kalyani Nagar, Pune'],
    visualTags: ['Coffee Rituals', 'ID Cleared', 'Orderly Common Spaces'],
    lifestyleDNA: {
      chronotype: 'flexible',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['cats', 'dogs'],
      smokingTolerance: false,
    },
  },
  {
    id: 'meera-iyer',
    userId: 'user-meera',
    displayName: 'Meera Iyer',
    headline: 'Design Systems Lead & Classical Vocalist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC64MbZWsNixcO8McDmNx9O0u22et38koHfzkR1L85nrNCbb5YIzzL6EMVp-HSbJhTQZQIgd_4WaL4w32CrGIgitEkcxxzRW-x-JQAf6rlgr-YzwwE8OYl8iut1Rz_pGMddRzECyh7vPq13cQSlOi5I8C-1wQqo8w9tl5PULqqKuweX89oMHAbseGsUMo0Lbj6JDZU5h4I5k0KmXmVqZMOGnpn_fd63AIUCd4gCyPkqW69Njzrwm3lCYA',
    bio: 'Based in Adyar, Chennai. Morning riyaaz with headphones, disciplined workspace, and clear shared house agreements.',
    budgetRange: { min: 15000, max: 25000, currency: 'INR' },
    preferredLocations: ['Adyar, Chennai', 'Besant Nagar, Chennai'],
    visualTags: ['Early Bird', 'Cultural Rituals', 'Clean Spaces'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 2,
      workStyle: 'wfh_full',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'arjun-rao',
    userId: 'user-arjun',
    displayName: 'Arjun Rao',
    headline: 'Senior Cloud Architect & Triathlete',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkrXIOQFr_z5E9eGhR9o5GdKIcRJItc5Va0e1s6Pvi2gJW9HstlN__2qqmol8Whb70aPTmU4TPWCvRGbOLjD7wwEDKCt9NMueejAZcpY_mEO-mVGei_3MiHaDq5qLMbEq_gHwvIm6BryawU0LrRMqY-zn1f7WInRW9Ktgdy5sP7qxlaFJIIM0_XJYflVqkUCxY7NYBnJkV6MHSa6RydvmAFN5TiOLhpZP7hGmsrkBOtAB1YJZSX8hYIg',
    bio: 'Working out of Hitec City, Hyderabad. Minimalist setup, punctual rent transfers, and weekend cooking experiments.',
    budgetRange: { min: 14000, max: 22000, currency: 'INR' },
    preferredLocations: ['Madhapur, Hyderabad', 'Gachibowli, Hyderabad'],
    visualTags: ['Tech Cohabitant', 'Punctual Ledger', 'Quiet Living'],
    lifestyleDNA: {
      chronotype: 'flexible',
      cleanlinessLevel: 4,
      socialEnergy: 2,
      workStyle: 'office_only',
      guestPolicy: 'rarely',
      petTolerance: ['none'],
      smokingTolerance: false,
    },
  },
  {
    id: 'kavya-menon',
    userId: 'user-kavya',
    displayName: 'Kavya Menon',
    headline: 'Documentary Filmmaker & Writer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBP--n4jsuUg_QhblCugKGaXaEIg45fGdVCQAMMLBFvT-MaK1wjykvVFcCyCFt7AEXrc8hxeRBUVIXDUs21-ZzBQmykP3998CrxKyfNZcxbpBL-5W5bi5naAsUM6G9RPm3ohmHlkIoNkiDk4iBle7T0afKZksl3KR77cqfGUBQQBJ8IkvXkf5e4Elc55SUw85e1EI2VgjGOsvjnfIKaPcS4Dofp_36j3SWhCeniG_jBRN7pIdW9BNr1eQ',
    bio: 'Exploring residential narratives in Hauz Khas, Delhi. Love natural lighting, quiet reading corners, and structured chore rotations.',
    budgetRange: { min: 18000, max: 28000, currency: 'INR' },
    preferredLocations: ['Hauz Khas, Delhi', 'Saket, Delhi', 'Green Park, Delhi'],
    visualTags: ['Creative Sanctuary', 'Verified Resident', 'Quiet Nights'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants', 'cats'],
      smokingTolerance: false,
    },
  },
  {
    id: 'siddharth-verma',
    userId: 'user-siddharth',
    displayName: 'Siddharth Verma',
    headline: 'Creative Technologist & Sound Designer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
    bio: 'Living in Assagao, Goa. Ambient synthesis workspace, strict headphone discipline for night creative work, and weekend communal meals.',
    budgetRange: { min: 16000, max: 28000, currency: 'INR' },
    preferredLocations: ['Assagao, Goa', 'Anjuna, Goa', 'Siolim, Goa'],
    visualTags: ['Acoustic Artist', 'Organic Kitchen', 'Night Owl'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 4,
      workStyle: 'wfh_full',
      guestPolicy: 'weekends_only',
      petTolerance: ['dogs', 'cats'],
      smokingTolerance: false,
    },
  },
  {
    id: 'pooja-banerjee',
    userId: 'user-pooja',
    displayName: 'Pooja Banerjee',
    headline: 'Museum Scenographer & Graphic Artist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDa2JCqF8-uGxjzWrQNLbFq7aayFMyciJunutZhWilYq4pQIvYDUgd9gGDyp90HUgiedWGnwDuJ6TN-apEeDu0qqBhGQkbMFsw26k1xsuR26uKwG2jecFSVTGHGxX5K1Fptb87BYgY7kPfj1Hcg6r_Vaj_5hynyjzDDVTVTsa4vQoneGjIVYeJB2peMufDEDotc7Z_R1N-XtOpKEB1-6oI8JYK1gWbFbji08JqeGfa7gev1gdw9jqX_bw',
    bio: 'Based in Salt Lake, Kolkata. Exploring tactile living spaces with rich books, terracotta crafts, and punctual shared expenses.',
    budgetRange: { min: 12000, max: 20000, currency: 'INR' },
    preferredLocations: ['Salt Lake, Kolkata', 'New Town, Kolkata'],
    visualTags: ['Artisan Living', 'Cultural Heritage', 'Early Riser'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 2,
      workStyle: 'hybrid',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'nikhil-joshi',
    userId: 'user-nikhil',
    displayName: 'Nikhil Joshi',
    headline: 'Sustainable Materials Designer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
    bio: 'Living in Viman Nagar, Pune. Early morning runs on Pune University campus, indoor plant sanctuary, and zero delayed rent history.',
    budgetRange: { min: 14000, max: 22000, currency: 'INR' },
    preferredLocations: ['Viman Nagar, Pune', 'Kalyani Nagar, Pune'],
    visualTags: ['Zero Waste Living', 'Aadhaar Verified', 'Early Bird'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'tara-sen',
    userId: 'user-tara',
    displayName: 'Tara Sen',
    headline: 'Ambient Musician & UX Researcher',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
    bio: 'Seeking an art-focused flat in Defence Colony, Delhi NCR. Night focus hours with closed acoustic doors, clean shared kitchen, and espresso culture.',
    budgetRange: { min: 20000, max: 32000, currency: 'INR' },
    preferredLocations: ['Defence Colony, Delhi', 'Lajpat Nagar, Delhi'],
    visualTags: ['Night Owl', 'High Acoustic Score', 'Tier 1 Trust'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['cats'],
      smokingTolerance: false,
    },
  },
];

export const INDIAN_DEMO_ROOMS: DemoRoomItem[] = [
  {
    id: 'the-indiranagar-studio',
    title: 'The Indiranagar Garden Studio',
    description:
      'Sun-drenched private room with attached balcony and teakwood workspace in a curated 3BHK flat on 12th Main, Indiranagar.',
    neighborhood: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    monthlyRent: 24000,
    deposit: 48000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      '1 Gbps Gigabit Fiber WiFi',
      'Daily Housekeeping & Linen',
      'Private Terrace Garden Balcony',
      '100% Power Inverter Backup',
      'Dedicated Teakwood Desk',
      'Air Conditioning & Cross-Breeze',
      'RO Pure Alkaline Water',
      'Washing Machine & Dryer',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
        title: 'Master Bedroom & Workspace',
        category: 'Private Suite',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
        title: 'Private Rain-Tree Balcony',
        category: 'Outdoor Terrace',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
        title: 'Shared Living Lounge & Coffee Bar',
        category: 'Common Living',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
        title: 'Deep Focus Teak Study',
        category: 'Workstation',
      },
    ],
    cohabitants: ['Ananya Sharma (Verified Architect)', 'Rohan Patil (AI Researcher)'],
    isAvailable: true,
  },
  {
    id: 'the-bandra-heritage-duplex',
    title: 'The Bandra Heritage Duplex',
    description:
      'High-ceiling master room with vintage mosaic tiles and acoustic isolation in Pali Hill, Bandra West.',
    neighborhood: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    monthlyRent: 32000,
    deposit: 64000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'High-Speed 1 Gbps WiFi',
      'Cook & Maid Shared Daily',
      'Air Conditioning & Soundproof Glazing',
      'Secure Covered Parking',
      'Vinyl Listening Lounge',
      'Modern Modular Kitchen',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
        title: 'Heritage Master Suite',
        category: 'Private Bedroom',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
        title: 'Sun-Drenched Living Space',
        category: 'Common Living',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
        title: 'Quiet Study Nook',
        category: 'Workstation',
      },
    ],
    cohabitants: ['Aarav Mehta (Verified Resident)', 'Aditya Kulkarni (Brand Strategist)'],
    isAvailable: true,
  },
  {
    id: 'the-baner-sanctuary',
    title: 'The Baner Minimalist Flat',
    description:
      'Quiet, airy room facing the Pashan hill line. Modern kitchen, water purifier, and dedicated ergonomic workstation.',
    neighborhood: 'Baner',
    city: 'Pune',
    state: 'Maharashtra',
    monthlyRent: 15500,
    deposit: 30000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Fiber Internet 500 Mbps',
      'Washing Machine & Balcony Line',
      'Solar Water Heating',
      'Clubhouse & Gym Access',
      'Dedicated Work Desk',
      'Quiet Hours Policy',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
        title: 'Minimalist Bedroom & Desk',
        category: 'Private Bedroom',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
        title: 'Pashan Hills Viewpoint Balcony',
        category: 'Outdoor Balcony',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
        title: 'Modern Common Living',
        category: 'Common Living',
      },
    ],
    cohabitants: ['Rohan Patil (Verified AI Researcher)', 'Nikhil Joshi (Materials Designer)'],
    isAvailable: true,
  },
  {
    id: 'the-hauz-khas-loft',
    title: 'The Hauz Khas Creative Loft',
    description:
      'Artisan-designed penthouse room overlooking Hauz Khas forest line. Expansive natural lighting, timber bookshelves, and serene quietude.',
    neighborhood: 'Hauz Khas',
    city: 'Delhi',
    state: 'Delhi NCR',
    monthlyRent: 26000,
    deposit: 50000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Dual Power Inverter Backup',
      'Daikin Air Purifiers',
      'Rooftop Flora Lounge',
      'Weekly Deep Cleaning',
      'Timber Study Desk',
      '1 Gbps Fiber WiFi',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
        title: 'Creative Loft & Terrace',
        category: 'Private Suite',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
        title: 'Artisan Living Room',
        category: 'Common Living',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
        title: 'Sunlit Reading Bedroom',
        category: 'Private Room',
      },
    ],
    cohabitants: ['Kavya Menon (Verified Resident)', 'Tara Sen (Ambient Musician)'],
    isAvailable: true,
  },
];

export const ACTIVE_INDIAN_STAY: IndianStayData = {
  id: 'stay-indiranagar-loft',
  title: 'The Indiranagar Sanctuary',
  neighborhood: 'Indiranagar 12th Main',
  city: 'Bengaluru',
  state: 'Karnataka',
  daysActive: 142,
  status: 'active',
  address: '428, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
  cohabitants: [
    {
      id: 'user-ananya',
      name: 'Ananya Sharma',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBTwHP-dedcvHuy1rko6qYkrmV_43Hl2to-1vH2SnFApVj2UEXDeSUeX4FvgXIQHRoEcY-aOfxeIkHlzdQMV1HiJXcdJ2CvOZxKi9CcoJsjXU9GR1HM0R4zdpv9tCAA3IIUHOhhoJ83PVw-njK-O8KGd4bPYUSBMtARJdTDO9sDF5F5UI25dy25hEN6nasZd2YYMKv2usKhBIcS7o9vzno75rGzkLGPC9Tn3L_gnbKiO4_4JbIWEMDZ8A',
      role: 'Architectural Designer',
      cleanlinessScore: 98,
    },
    {
      id: 'user-rohan',
      name: 'Rohan Patil',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
      role: 'AI Researcher',
      cleanlinessScore: 94,
    },
  ],
  todayResponsibilities: [
    {
      id: 'resp-1',
      title: 'Kitchen & Island Deep Clean',
      assignee: "Ananya's Turn",
      description: 'Clear quartz countertops, run the dishwasher, wipe down stove.',
      status: 'pending',
    },
    {
      id: 'resp-2',
      title: 'Bescom Electricity Bill',
      assignee: 'Due Today',
      description: '₹2,850 total. Split equally among 3 flatmates.',
      status: 'pending',
      urgent: true,
      costINR: 2850,
    },
    {
      id: 'resp-3',
      title: 'BigBasket Household Staples',
      assignee: 'Rohan Patil',
      description: 'Filter coffee grounds, oat milk, cold-pressed sunflower oil, dish liquid.',
      status: 'completed',
    },
  ],
  financialEquilibrium: {
    userBalance: -950.0,
    currency: '₹',
    breakdown: [
      { name: 'Ananya', reason: 'For Organic Groceries', amount: -950.0 },
      { name: 'Rohan', reason: 'For Airtel Gigabit Fiber', amount: 400.0 },
    ],
  },
};

export const INITIAL_INDIAN_EXPENSES: DemoExpenseItem[] = [
  {
    id: 'exp-1',
    title: 'Nature’s Basket Organic Essentials',
    amount: 2850.0,
    paidBy: 'Ananya Sharma',
    category: 'Groceries',
    date: 'Yesterday',
    userShare: 950.0,
    status: 'Pending',
  },
  {
    id: 'exp-2',
    title: 'Airtel Xstream Gigabit Fiber (300 Mbps)',
    amount: 1199.0,
    paidBy: 'You',
    category: 'Utilities',
    date: '10 Aug 2026',
    userShare: -799.0,
    status: 'Settled',
  },
  {
    id: 'exp-3',
    title: 'Urban Company House Deep Cleaning',
    amount: 1800.0,
    paidBy: 'Rohan Patil',
    category: 'Maintenance',
    date: '04 Aug 2026',
    userShare: 600.0,
    status: 'Settled',
  },
];

export interface DemoNeighborhoodItem {
  id: string;
  name: string;
  character: string;
  rentRange: string;
  commute: string;
  lifestyle: string;
  roommateFit: string;
  roomId?: string;
}

export interface DemoDestinationItem {
  id: string;
  city: string;
  state: string;
  tagline: string;
  description: string;
  heroImageUrl: string;
  livingCostRange: string;
  vibeTags: string[];
  transitInfo: string;
  workCulture: string;
  neighborhoods: DemoNeighborhoodItem[];
  availableRoomsCount: number;
  verifiedResidentsCount: number;
  curatedRoomId: string;
  featuredResidentId: string;
  livingItinerary: {
    phase: string;
    time: string;
    title: string;
    activity: string;
    tag: string;
  }[];
}

export const INDIAN_DEMO_DESTINATIONS: DemoDestinationItem[] = [
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'High-Resonance Tech & Botanical Living',
    description:
      'Where tree-lined boulevards meet India’s premier creative and technological minds. Experience tranquil morning filter coffee rituals, lush green canopies, and forward-thinking co-living cultures.',
    heroImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
    livingCostRange: '₹18,000 – ₹42,000 / mo',
    vibeTags: ['Filter Coffee Rituals', 'Namma Metro', 'Design Studios', 'Canopy Streets'],
    transitInfo: 'Namma Metro Purple & Green lines + EV Auto aggregators and walkable ring roads.',
    workCulture: 'Hybrid engineering hubs, independent design studios, and lush outdoor cafes with 1 Gbps fiber.',
    availableRoomsCount: 14,
    verifiedResidentsCount: 86,
    curatedRoomId: 'the-indiranagar-studio',
    featuredResidentId: 'ananya-sharma',
    neighborhoods: [
      {
        id: 'indiranagar',
        name: 'Indiranagar',
        character: 'Creative, Walkable, Tree-lined & High Café Density',
        rentRange: '₹20,000 – ₹35,000 / mo',
        commute: 'Purple Line Metro Station (100ft Rd / CMH Rd)',
        lifestyle: 'Early morning joggers at Defence Colony, artisan roasteries, and quiet residential evenings.',
        roommateFit: 'Designers, product architects, and early-morning ritual lovers.',
        roomId: 'the-indiranagar-studio',
      },
      {
        id: 'koramangala',
        name: 'Koramangala',
        character: 'Vibrant Startup Ecosystem & Culinary Strip',
        rentRange: '₹18,000 – ₹30,000 / mo',
        commute: 'Intermediate Ring Road & upcoming Pink Line connectivity',
        lifestyle: 'Founders building in weekend cafes, boutique gyms, and high-energy community dinners.',
        roommateFit: 'Entrepreneurs, VC analysts, and collaborative creatives.',
      },
      {
        id: 'hsr-layout',
        name: 'HSR Layout',
        character: 'Spacious Sectors, Broad Avenues & Tech Discipline',
        rentRange: '₹16,000 – ₹28,000 / mo',
        commute: 'Outer Ring Road tech spine & Silk Board interchange',
        lifestyle: 'Lush neighborhood parks, specialty cold brew spots, and clean residential layout.',
        roommateFit: 'Engineers, researchers, and remote tech professionals.',
      },
      {
        id: 'whitefield',
        name: 'Whitefield',
        character: 'Expansive Campus Living & Gated Quietude',
        rentRange: '₹14,000 – ₹24,000 / mo',
        commute: 'Direct Namma Metro Purple Line terminal station',
        lifestyle: 'Resort-style residential suites, quiet balconies, and weekend artisan markets.',
        roommateFit: 'Global tech leaders, enterprise researchers, and tranquility seekers.',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '07:00 AM – 09:30 AM',
        title: 'Filter Coffee & Canopy Walk',
        activity: 'Fresh South Indian filter coffee on 12th Main Indiranagar followed by a peaceful stroll along Defence Colony avenue.',
        tag: 'Local Ritual',
      },
      {
        phase: 'Afternoon',
        time: '01:00 PM – 04:30 PM',
        title: 'Focus Study & Hybrid Work',
        activity: 'Co-work from a natural sunlight glasshouse cafe with 1 Gbps fiber connection alongside fellow builders.',
        tag: 'Workspace Sync',
      },
      {
        phase: 'Evening',
        time: '06:30 PM – 08:30 PM',
        title: 'Chai & Flatmate Walkthrough',
        activity: 'Meet verified resident Ananya Sharma for a chai walkthrough of The Indiranagar Garden Studio and review quiet hours.',
        tag: 'Living Harmony',
      },
      {
        phase: 'Night',
        time: '10:30 PM',
        title: 'Acoustic Baseline Verification',
        activity: 'Experience the 10:30 PM residential quietude and peaceful sleep environment firsthand.',
        tag: 'Quiet Hours',
      },
    ],
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'Coastal Energy & Heritage Living',
    description:
      'The pulse of modern India set against the Arabian Sea. Walk along heritage art-deco promenades, discover hidden Portuguese lanes in Bandra, and connect with ambitious cultural innovators.',
    heroImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcPyLH-KHdtS72x-hr5aPCs6xyEcUEmITkP5TRXSn-oG2C8akFaJT_vZDf8BEjVan9T-esm9GYSrfOoNY26kY-TxpKGLGgPdTzGHR-g1ye90LLaOerp0adDCc-LDyfOLVdi2QsZey0oN9H6JqEegvVB_k7GX5IESd5ysRopJZSU68x_vfwS04XnUzlAajbCHf8NeAncqqm2_lYRBRJ2kf8oL3bYkgQu2sOAiOVvQYhw1bzIqYF-ufI7w',
    livingCostRange: '₹26,000 – ₹65,000 / mo',
    vibeTags: ['Bandra Promenades', 'Art Deco Lofts', 'Coastal Breezes', 'Cultural Salons'],
    transitInfo: 'Western & Central Local trains, Mumbai Coastal Road, and Bandra-Worli Sea Link.',
    workCulture: 'Media executives, creative directors, and fintech leaders working in sunlight-filled sea-facing duplexes.',
    availableRoomsCount: 11,
    verifiedResidentsCount: 104,
    curatedRoomId: 'the-bandra-heritage-duplex',
    featuredResidentId: 'aarav-mehta',
    neighborhoods: [
      {
        id: 'bandra-west',
        name: 'Bandra West',
        character: 'Heritage Cottages, Seafront Promenade & Artisanal Culture',
        rentRange: '₹28,000 – ₹55,000 / mo',
        commute: 'Bandra Station + quick access to Sea Link and BKC',
        lifestyle: 'Morning jogs at Carter Road, artisan sourdough bakeries on Pali Hill, and acoustic evening salons.',
        roommateFit: 'Creative directors, media writers, and fintech leaders.',
        roomId: 'the-bandra-heritage-duplex',
      },
      {
        id: 'juhu',
        name: 'Juhu',
        character: 'Coastal Beachfront, Theaters & Leafy Quiet Lanes',
        rentRange: '₹30,000 – ₹60,000 / mo',
        commute: 'Western line + Metro Line 2A & 7 connectivity',
        lifestyle: 'Quiet residential walks near Prithvi Theatre, coastal sunsets, and spacious apartment layouts.',
        roommateFit: 'Writers, filmmakers, and theater enthusiasts.',
      },
      {
        id: 'khar-west',
        name: 'Khar West',
        character: 'Charming Old-World Residential & Boutique Cafés',
        rentRange: '₹24,000 – ₹45,000 / mo',
        commute: 'Khar Road station & SV Road spine',
        lifestyle: 'Leafy lanes, independent bookstores, and peaceful community atmosphere.',
        roommateFit: 'Architects, consultants, and mindful professionals.',
      },
      {
        id: 'lower-parel',
        name: 'Lower Parel',
        character: 'Sleek High-Rises & Corporate Creative HQs',
        rentRange: '₹35,000 – ₹70,000 / mo',
        commute: 'Monorail, Coastal Road & Central/Western interchange',
        lifestyle: 'Panoramic skyline views, rooftop fitness lounges, and fast-paced professional life.',
        roommateFit: 'Investment bankers, tech leads, and venture operators.',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '06:30 AM – 08:30 AM',
        title: 'Carter Road Seafront Jog',
        activity: 'Brisk sea-breeze run along Carter Road promenade followed by fresh coconut water.',
        tag: 'Coastal Routine',
      },
      {
        phase: 'Afternoon',
        time: '12:00 PM – 04:00 PM',
        title: 'Heritage Cafe Remote Workspace',
        activity: 'Work from a vintage art-deco cafe on Pali Hill with artisan sourdough lunch.',
        tag: 'Work Lifestyle',
      },
      {
        phase: 'Evening',
        time: '06:00 PM – 08:00 PM',
        title: 'Vinyl Session & Room Walkthrough',
        activity: 'Meet Aarav Mehta at The Bandra Heritage Duplex for vinyl music listening and kitchen sharing standards discussion.',
        tag: 'Cohabitant Meet',
      },
      {
        phase: 'Night',
        time: '10:00 PM',
        title: 'Sunset Sea View Verification',
        activity: 'Check the balcony acoustics and sea breeze for quiet evening relaxation.',
        tag: 'Living Space',
      },
    ],
  },
  {
    id: 'pune',
    city: 'Pune',
    state: 'Maharashtra',
    tagline: 'Academic Greenery & Research Tranquility',
    description:
      'Nestled against the Sahyadri foothills. Banyan tree canopies, prestigious research institutions, and serene residential neighborhoods with an unbeatable cost of living.',
    heroImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZyjxDjRQuQZHNkpfNglORcqnfU8Ka1u6AT7THzvX-MKZrhyurNd8JMBcrDTQL8NWFu1MT_xR_CxSS-HhFSvxMuwFw50QHbPsnpHEBGJGIuzHVyENdJvbXue--YmTiuUVii_iTT2Egjeng4WJnPiHXhgmf6SKl9r8OwP1_8tFCo8b-bmEFf4dIRggWJaEZGYb3IpwnhD9R8lTDKMVUN-qRnAR8VC-2J9pR9skoAQNIcqFQJ5xvkPY-A',
    livingCostRange: '₹12,000 – ₹26,000 / mo',
    vibeTags: ['Foothill Breezes', 'Research Discipline', 'Green Canopy', 'Quiet Living'],
    transitInfo: 'Pune Metro Aqua Line, Baner-Hinjawadi Expressway & EV auto network.',
    workCulture: 'AI labs, automotive design studios, and academic research fellows maintaining disciplined routines.',
    availableRoomsCount: 9,
    verifiedResidentsCount: 62,
    curatedRoomId: 'the-baner-sanctuary',
    featuredResidentId: 'rohan-patil',
    neighborhoods: [
      {
        id: 'baner',
        name: 'Baner',
        character: 'Modern Hillside Views, Tech Corridors & Organic Living',
        rentRange: '₹12,000 – ₹22,000 / mo',
        commute: 'Direct Baner-Pashan link & Hinjawadi IT access',
        lifestyle: 'Morning treks to Baner hill trail, organic farmer markets, and high-speed fiber setups.',
        roommateFit: 'AI engineers, data scientists, and mountain lovers.',
        roomId: 'the-baner-sanctuary',
      },
      {
        id: 'koregaon-park',
        name: 'Koregaon Park',
        character: 'Lush Banyan Canopy, Heritage Bungalows & Global Cafés',
        rentRange: '₹16,000 – ₹30,000 / mo',
        commute: 'Proximity to Pune station & Kalyani Nagar bridge',
        lifestyle: 'Tree-covered private lanes, international culinary spots, and artistic community gatherings.',
        roommateFit: 'Writers, architects, and lifestyle curators.',
      },
      {
        id: 'kalyani-nagar',
        name: 'Kalyani Nagar',
        character: 'Riverside Serenity & Premium Residential Complexes',
        rentRange: '₹14,000 – ₹26,000 / mo',
        commute: 'Ahmednagar Road transit & Metro line connectivity',
        lifestyle: 'Quiet residential greens, riverside jogging parks, and curated co-living lofts.',
        roommateFit: 'Corporate leaders, researchers, and hybrid executives.',
      },
      {
        id: 'viman-nagar',
        name: 'Viman Nagar',
        character: 'Young Professional Hub & Walkable Plazas',
        rentRange: '₹12,000 – ₹20,000 / mo',
        commute: 'Airport proximity & direct metro access',
        lifestyle: 'Vibrant outdoor eateries, student cultural festivals, and compact modern studios.',
        roommateFit: 'Recent graduates, aviation professionals, and analysts.',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '06:00 AM – 08:00 AM',
        title: 'Baner Hill Sunrise Hike',
        activity: 'Scenic morning walk to the top of Baner Tekdi with panoramic valley views.',
        tag: 'Nature Sync',
      },
      {
        phase: 'Afternoon',
        time: '12:30 PM – 04:30 PM',
        title: 'Research Study & Remote Coding',
        activity: 'Work in a quiet hillside apartment with high-speed fiber and dual battery backup.',
        tag: 'Focus Rhythm',
      },
      {
        phase: 'Evening',
        time: '06:30 PM – 08:00 PM',
        title: 'Tech Lab Chat & Room Review',
        activity: 'Meet Rohan Patil at The Baner Minimalist Flat to inspect the workspace setup and power backup systems.',
        tag: 'Resident Synergy',
      },
      {
        phase: 'Night',
        time: '10:30 PM',
        title: 'Foothill Silence Check',
        activity: 'Experience zero vehicular noise and cool western ghat nocturnal breeze.',
        tag: 'Sleep Sanctuary',
      },
    ],
  },
  {
    id: 'delhi',
    city: 'Delhi NCR',
    state: 'Delhi / Haryana',
    tagline: 'Monumental Heritage & Spacious Lofts',
    description:
      'Where ancient architectural ruins meet expansive green forest lines and soaring industrial lofts. Experience warm winter daylight, rich cultural salons, and seamless rapid transit across the capital.',
    heroImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWrgUNcRr6nebRXtPIO7abqFux49UUUAf66KOSsOl5mVkYNETBXTiw6QlCfbFRfTotsPvyasktRwzMrgX0B_nIObb7a3VTaoQalieqgFd_kqqyy5Ts97sYEKclvpJF9RHSuDqr4I_9ZNr5dolPXBQbOozBYZM9OyWdM1dmDB8S6igPiKPLH1JRVqKAgMCndxEEsZOTcWYeB9LnKsQqchwfK70j85fh3pcUD5S95U3JxgNfypN9EmqBw',
    livingCostRange: '₹18,000 – ₹48,000 / mo',
    vibeTags: ['Hauz Khas Forest', 'Delhi Metro', 'Terrace Lofts', 'Winter Sunlight'],
    transitInfo: 'Delhi Metro Yellow, Magenta & Violet Lines + Gurgaon Rapid Metro network.',
    workCulture: 'Policy analysts, design architects, and tech founders working from rooftop studios and diplomatic enclaves.',
    availableRoomsCount: 16,
    verifiedResidentsCount: 92,
    curatedRoomId: 'the-hauz-khas-loft',
    featuredResidentId: 'kavya-menon',
    neighborhoods: [
      {
        id: 'hauz-khas',
        name: 'Hauz Khas & Green Park',
        character: 'Forest Views, Medieval Architecture & Creative Studios',
        rentRange: '₹18,000 – ₹32,000 / mo',
        commute: 'Yellow & Magenta Line interchange station (Hauz Khas)',
        lifestyle: 'Morning runs along the deer park forest, reading at terrace cafes, and artisanal pottery workshops.',
        roommateFit: 'Artists, landscape architects, and heritage enthusiasts.',
        roomId: 'the-hauz-khas-loft',
      },
      {
        id: 'golf-course-road',
        name: 'Golf Course Road (Gurgaon)',
        character: 'Modern Glass Lofts, Rapid Metro & Corporate Luxury',
        rentRange: '₹22,000 – ₹45,000 / mo',
        commute: 'Direct Rapid Metro access connecting to Cyber City',
        lifestyle: 'Modern gated communities, indoor Olympic pools, and seamless highway connectivity.',
        roommateFit: 'Tech founders, venture capitalists, and global operators.',
      },
      {
        id: 'vasant-vihar',
        name: 'Vasant Vihar',
        character: 'Diplomatic Greenery, Broad Boulevards & Quiet Mansions',
        rentRange: '₹24,000 – ₹50,000 / mo',
        commute: 'Magenta Line Metro & quick airport access',
        lifestyle: 'Peaceful embassy neighborhoods, high security, and private lush gardens.',
        roommateFit: 'Diplomats, researchers, and senior professionals.',
      },
      {
        id: 'defence-colony',
        name: 'Defence Colony',
        character: 'Central Culinary Hub & Wide Residential Blocks',
        rentRange: '₹25,000 – ₹48,000 / mo',
        commute: 'Violet Line Metro (Lajpat Nagar / Moolchand)',
        lifestyle: 'Walking access to premier bakeries, neighborhood parks, and established resident culture.',
        roommateFit: 'Legal consultants, writers, and journalists.',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '07:00 AM – 09:00 AM',
        title: 'Hauz Khas Reservoir Walk',
        activity: 'Morning forest walk along the 13th-century Hauz Khas monument and lake.',
        tag: 'Heritage Walk',
      },
      {
        phase: 'Afternoon',
        time: '01:00 PM – 05:00 PM',
        title: 'Sunlit Terrace Coworking',
        activity: 'Work from a quiet rooftop terrace studio with indoor air purifiers and 1 Gbps fiber.',
        tag: 'Creative Flow',
      },
      {
        phase: 'Evening',
        time: '06:30 PM – 08:30 PM',
        title: 'Chai & Living Space Inspection',
        activity: 'Meet verified resident Kavya Menon at The Hauz Khas Creative Loft to inspect the timber study desk and air quality systems.',
        tag: 'Room Inspection',
      },
      {
        phase: 'Night',
        time: '10:30 PM',
        title: 'Forest Line Night Silence',
        activity: 'Verify quiet hours and deep peaceful rest overlooking the deer park trees.',
        tag: 'Sanctuary Check',
      },
    ],
  },
];

