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
  coordinates?: [number, number];
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
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Filter Coffee', 'Quiet Hours', 'Architectural Digest'],
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
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvMpO73IsC2lGAlRr8a36w9vef0AdMCr2Vkf2wPGWyc-PNq19KyOn91r8y0f8Q-lzfITMOutCzx2-cPpPTEkbmlL8Y-dXkuvAXXgY5FuYEQ63pJp_Xt82aAhcLP0UNo9ec7CAZvZk50NrtBHMLs05I59ZmKQsCZyI6LxngpFa7S1yIG0lIVCS8jKrjs0n-iDl5yrvgm15aZVNTY5ofwt5EypTHeqanc-AMFnP_dB2iBbtnW1pHEI_uQ',
    bio: 'Looking for a heritage flat in Bandra West with wooden floors. I enjoy vinyl listening sessions, morning runs at Carter Road, and disciplined shared living.',
    budgetRange: { min: 22000, max: 35000, currency: 'INR' },
    preferredLocations: ['Bandra West, Mumbai', 'Khar West, Mumbai'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Vinyl Collector', 'Quiet Hours', 'Carter Road Runner'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 4,
      workStyle: 'remote',
      guestPolicy: 'flexible',
      petTolerance: ['cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'rohan-patil',
    userId: 'user-rohan',
    displayName: 'Rohan Patil',
    headline: 'AI Research Scientist & Cyclist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2i8SWb4apq6U1es6wns7xbL7M0iATnV9B0tUPVJ8wkAcPPnSxWpkn7RkYeWkoEHQd0963RC1wXOpzAIpyr3-iHi_2rFrr0ee44glSA9C-3IMa8KVBFUuRkLkR7z5xDs39RTkQi5dodR4MExu9kttg4kfvaxAUCMKUutHCViobglnW4KmJvyEBm03D1AT5KE-6Vi3hF7cWFK6G_AwvFQE5R9fiVI_tgFyEztv6vxUoaqk8MaqskJEImQ',
    bio: 'Working on multimodal vision models. Need high-speed fiber internet, peaceful work environment, and early morning quietude in Baner.',
    budgetRange: { min: 12000, max: 20000, currency: 'INR' },
    preferredLocations: ['Baner, Pune', 'Aundh, Pune', 'Balewadi, Pune'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'High-Speed Fiber', 'Quiet Hours', 'Cyclist'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 2,
      workStyle: 'remote',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
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
    bio: 'Passionate about typography, South Indian filter roasts, and quiet Sunday readings. Seeking a plant-filled space in Koramangala or Indiranagar.',
    budgetRange: { min: 16000, max: 26000, currency: 'INR' },
    preferredLocations: ['Koramangala, Bengaluru', 'Indiranagar, Bengaluru'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Tea Rituals', 'Quiet Hours', 'Botanical Living'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['dogs', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'aditya-kulkarni',
    userId: 'user-aditya',
    displayName: 'Aditya Kulkarni',
    headline: 'Brand Strategist & Specialty Coffee Roaster',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK_9NnhlZkr6Pkn0lhOlguCm2SQeh6OMQXhu0IpHtite7Jkyg01pOI5ETUDoiA9qRorQhh07HrHK62hEG2nPDpODQhaWKN8MQ0ZlIpv4MGVZa62ojUIBYOS55qT6NN-mBOOVDMC3MUL8mgol6VTGmKT5WKKWJ2saeFSKqpTQOk98w9RkkYl7eldJmIT1F6xc8RHR3vdB1uzkpY7lnlIRpvEE8h64G6A-JxwQsX73invKkEaJ6lPkdtcw',
    bio: 'Appreciate curated spaces, clean kitchen counters, and good sourdough bread. Work in branding and maintain respectful boundaries.',
    budgetRange: { min: 14000, max: 24000, currency: 'INR' },
    preferredLocations: ['Koregaon Park, Pune', 'Kalyani Nagar, Pune'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Specialty Coffee', 'Quiet Hours', 'Design Minded'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 4,
      workStyle: 'hybrid',
      guestPolicy: 'flexible',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'meera-iyer',
    userId: 'user-meera',
    displayName: 'Meera Iyer',
    headline: 'Design Systems Lead & Classical Vocalist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBommkV4DLPt6GJCejGF2iQ9uT-P9wRS5mHuief1hVSrolxQIJrtBI0kZPD0erbrxdY8geGv-3mnfSu0JIVbeS_FdojbdduEqEHPIybpnYlIIeC0WZ-ItuwvMQ2ULlw4tJkLq0YQjy2ex5BQFJ26OB7hsAXxOQr_GdjK4wVY-q7PCl3_8DsTsCCl9HLR8RsAj1SsqMygz9lWOqnX_fU6R_NEAKImBCmabGKb48b_XMMyd2Yf7ZmGPXD-A',
    bio: 'Morning vocal practice with mute dampeners. Seeking a calm, coastal flat in Adyar or Besant Nagar with ocean breeze and high ceilings.',
    budgetRange: { min: 15000, max: 25000, currency: 'INR' },
    preferredLocations: ['Adyar, Chennai', 'Besant Nagar, Chennai'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Classical Music', 'Coastal Breezes', 'Clean Living'],
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
    id: 'arjun-rao',
    userId: 'user-arjun',
    displayName: 'Arjun Rao',
    headline: 'Senior Cloud Architect & Acoustician',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGQ-ozjyyc6Eupf8aRCKD-Gfs143df1Ghb7uzTJ4SOClrK2QuZDJip7o5pj1ro4g_bFE27qxxvpHIPuRPR6bW6I41fOXfLGi3tWmDGwhZ_vAlQMpjaIKe2cIXm6FOa7wfsGRujM2d9uqvVOXgezykAM4MUyuGnel8eYZnfT0HFL4KvB7uNudvifiiImCYS4L8fPKO0C7VUnYfVukgLsDznY-OpMfhb0hbdnOjEvq5yWJo0f4v6nK4uNA',
    bio: 'Building enterprise infrastructure. Clean, punctual with utility splits, and mindful of roommate quiet hours.',
    budgetRange: { min: 14000, max: 22000, currency: 'INR' },
    preferredLocations: ['Madhapur, Hyderabad', 'Gachibowli, Hyderabad', 'Jubilee Hills, Hyderabad'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Acoustic Balance', 'Quiet Hours', 'Tech Focused'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'kavya-menon',
    userId: 'user-kavya',
    displayName: 'Kavya Menon',
    headline: 'Documentary Filmmaker & Botanical Writer',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHyt4KRDIw7RGLkhJSttYv3I0QeuHDW-sqRHaJ2ClbdvrvUNl4IQTzEiJnnVBZqTaEN5DwWzrMnDUMyMbFuGAysEkeiJAcj60k3RpTv2oQAyqU01paG0uVQBQAfc1y8Y92ePknF7Q4InVJ07JX3rLCmHqnE5RqV8nmboL0AjAXPH830gN7u7kr7HNJtaZSPWqoiVAH6Mc2z0mZqO-bkVcziUZIW_F9wfLIRfo41t9GavmRQgP4pd5DPg',
    bio: 'Documenting indigenous forests across India. Need a sunlit loft space near Hauz Khas Deer Park with balcony green space.',
    budgetRange: { min: 18000, max: 28000, currency: 'INR' },
    preferredLocations: ['Hauz Khas, Delhi', 'Green Park, Delhi', 'Greater Kailash, Delhi'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Forest Views', 'Quiet Hours', 'Visual Artist'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 4,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['dogs', 'cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'rahul-deshmukh',
    userId: 'user-rahul',
    displayName: 'Rahul Deshmukh',
    headline: 'Acoustics Engineer & Podcaster',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC64MbZWsNixcO8McDmNx9O0u22et38koHfzkR1L85nrNCbb5YIzzL6EMVp-HSbJhTQZQIgd_4WaL4w32CrGIgitEkcxxzRW-x-JQAf6rlgr-YzwwE8OYl8iut1Rz_pGMddRzECyh7vPq13cQSlOi5I8C-1wQqo8w9tl5PULqqKuweX89oMHAbseGsUMo0Lbj6JDZU5h4I5k0KmXmVqZMOGnpn_fd63AIUCd4gCyPkqW69Njzrwm3lCYA',
    bio: 'Audiophile with high respect for sound dampening and private quiet time. Looking for a modern 2BHK flatmate in Dadar or Lower Parel.',
    budgetRange: { min: 20000, max: 32000, currency: 'INR' },
    preferredLocations: ['Dadar West, Mumbai', 'Lower Parel, Mumbai', 'Prabhadevi, Mumbai'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Sound Isolation', 'Quiet Hours', 'Acoustic Specialist'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'sneha-kapoor',
    userId: 'user-sneha',
    displayName: 'Sneha Kapoor',
    headline: 'Contemporary Ceramicist & Urban Botanist',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPEq_t3wsCyapXNBS865uHThQBZujCO3GiaPOfGBQzvmerZwqxLhKZ-ur2iSb2xCtFNuH7QFVc6-th58KsttfXVaPuUYHEQOhe0ZKc8lPpYDvN5NPqy_bF3jUqBjuLvvOZu0CC3Qg_q8cemmVa71PJXG89iqoX4SMRkJsufIeTWBL3QpYQCR6BMcuYQqnHSquicrX8LGb1KPLy5a66czJkWlo3wiHOfu7j3bI5hOaWYH8WgRXNg7dQKw',
    bio: 'Creating functional stoneware. Early riser who loves natural morning light, clean uncluttered surfaces, and mindful shared cooking.',
    budgetRange: { min: 17000, max: 27000, currency: 'INR' },
    preferredLocations: ['Greater Kailash, Delhi', 'Vasant Kunj, Delhi', 'Defence Colony, Delhi'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Ceramics Studio', 'Natural Light', 'Minimalist'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'vikramaditya-sen',
    userId: 'user-vikram',
    displayName: 'Vikramaditya Sen',
    headline: 'Computational Linguist & Rare Books Collector',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Working on low-resource Indic NLP models. Deep appreciation for heritage high-ceiling rooms in Park Street or Ballygunge with teak bookshelves.',
    budgetRange: { min: 14000, max: 22000, currency: 'INR' },
    preferredLocations: ['Park Street, Kolkata', 'Ballygunge, Kolkata'],
    visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Rare Books', 'High Ceilings', 'Quiet Scholar'],
    lifestyleDNA: {
      chronotype: 'balanced',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'tara-alvares',
    userId: 'user-tara',
    displayName: 'Tara Alvares',
    headline: 'Sustainable Landscape Architect & Permaculturist',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Designing climate-resilient native gardens in Goa. Seeking a serene Portuguese heritage sanctuary in Assagao or Siolim with garden access.',
    budgetRange: { min: 25000, max: 40000, currency: 'INR' },
    preferredLocations: ['Assagao, Goa', 'Siolim, Goa', 'Porvorim, Goa'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Portuguese Heritage', 'Organic Garden', 'Quiet Lifestyle'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'flexible',
      petTolerance: ['dogs', 'cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'nikhil-joshi',
    userId: 'user-nikhil',
    displayName: 'Nikhil Joshi',
    headline: 'Quantum Computing Researcher & Trail Runner',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Trail running on Vetal Tekdi at dawn, research coding through the afternoon. Looking for a bright flat in Kalyani Nagar or Baner.',
    budgetRange: { min: 15000, max: 24000, currency: 'INR' },
    preferredLocations: ['Kalyani Nagar, Pune', 'Baner, Pune', 'Aundh, Pune'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Trail Runner', 'High Focus', 'Clean Living'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 2,
      workStyle: 'remote',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'pooja-hegde',
    userId: 'user-pooja',
    displayName: 'Pooja Hegde',
    headline: 'Product Experience Lead & Coffee Enthusiast',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Early mornings with pourover coffee and yoga. Looking for a modern 3BHK flatmate in HSR Layout Sector 2 or 3 with dedicated workspace.',
    budgetRange: { min: 20000, max: 30000, currency: 'INR' },
    preferredLocations: ['HSR Layout, Bengaluru', 'Koramangala, Bengaluru'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Yoga Routine', 'Specialty Pourover', 'Punctual Ledger'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 4,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'devansh-singhania',
    userId: 'user-devansh',
    displayName: 'Devansh Singhania',
    headline: 'Quant Fund Manager & Acoustic Purist',
    avatarUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Algorithmic trading systems lead. Need a high-floor modern sanctuary on Golf Course Road with noise isolation and high-speed multi-line fiber.',
    budgetRange: { min: 30000, max: 55000, currency: 'INR' },
    preferredLocations: ['Golf Course Road, Gurugram', 'Cyber City, Gurugram'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'High-Floor Skyline', 'Soundproofing', 'Financial Discipline'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'shreya-mukherjee',
    userId: 'user-shreya',
    displayName: 'Shreya Mukherjee',
    headline: 'Ethnomusicologist & Documentary Audio Producer',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Documenting rare musical traditions across Bengal. Need an acoustically peaceful rowhouse room in South Kolkata with vintage charm.',
    budgetRange: { min: 13000, max: 21000, currency: 'INR' },
    preferredLocations: ['Ballygunge, Kolkata', 'Southern Avenue, Kolkata'],
    visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Audio Studio', 'Terrace Access', 'Cultured Living'],
    lifestyleDNA: {
      chronotype: 'balanced',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'zainab-merchant',
    userId: 'user-zainab',
    displayName: 'Zainab Merchant',
    headline: 'Art Historian & Heritage Gallery Director',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Curating South Asian modernism exhibits. Looking for high ceilings, vintage stone flooring, and a quiet artistic flatmate in Colaba or Fort.',
    budgetRange: { min: 28000, max: 48000, currency: 'INR' },
    preferredLocations: ['Colaba, Mumbai', 'Fort, Mumbai', 'Marine Lines, Mumbai'],
    visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Art Deco', 'Heritage Living', 'Museum Curations'],
    lifestyleDNA: {
      chronotype: 'balanced',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'karthik-sundaram',
    userId: 'user-karthik',
    displayName: 'Karthik Sundaram',
    headline: 'Robotics Hardware Engineer & Surfer',
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: 'Dawn surfing sessions at Covelong Beach, building autonomous sub-systems during the day. Need a clean, breezy room in Besant Nagar.',
    budgetRange: { min: 16000, max: 26000, currency: 'INR' },
    preferredLocations: ['Besant Nagar, Chennai', 'Thiruvanmiyur, Chennai'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Surfer Lifestyle', 'Hardware Labs', 'Beach Proximity'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 4,
      workStyle: 'in_office',
      guestPolicy: 'flexible',
      petTolerance: ['dogs', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'aniruddh-varma',
    userId: 'user-aniruddh',
    displayName: 'Aniruddh Varma',
    headline: 'Principal UX Architect & Specialty Baker',
    avatarUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    bio: 'Designing global healthcare interfaces. Weekends dedicated to natural sourdough fermentation. Seeking a spacious flat in Jubilee Hills.',
    budgetRange: { min: 22000, max: 36000, currency: 'INR' },
    preferredLocations: ['Jubilee Hills, Hyderabad', 'Banjara Hills, Hyderabad'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Sourdough Baker', 'Gourmet Kitchen', 'Quiet Professional'],
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
    id: 'diya-chawla',
    userId: 'user-diya',
    displayName: 'Diya Chawla',
    headline: 'Environmental Policy Analyst & Hiker',
    avatarUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    bio: 'Working on clean energy transition frameworks. Strictly organic kitchen, zero single-use plastics, and quiet evenings in Vasant Kunj.',
    budgetRange: { min: 19000, max: 30000, currency: 'INR' },
    preferredLocations: ['Vasant Kunj, Delhi', 'Hauz Khas, Delhi'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Zero Waste', 'Aravalli Hikes', 'Eco Conscious'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'samarth-kulkarni',
    userId: 'user-samarth',
    displayName: 'Samarth Kulkarni',
    headline: 'Distributed Systems Architect & Espresso Crafter',
    avatarUrl:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    bio: 'Deep into cloud scalability and manual lever espresso machines. Looking for a modern 2BHK flatmate in Whitefield with clubhouse amenities.',
    budgetRange: { min: 22000, max: 34000, currency: 'INR' },
    preferredLocations: ['Whitefield, Bengaluru', 'ITPL Spine, Bengaluru'],
    visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Espresso Aficionado', 'High Tech', 'Modern Suites'],
    lifestyleDNA: {
      chronotype: 'balanced',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'natasha-lobo',
    userId: 'user-natasha',
    displayName: 'Natasha Lobo',
    headline: 'Creative Director & Indie Game Developer',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Building narrative puzzle games. Need a quiet cottage room in Anjuna with natural garden air, fast WiFi, and respectful acoustic separation.',
    budgetRange: { min: 24000, max: 38000, currency: 'INR' },
    preferredLocations: ['Anjuna, Goa', 'Assagao, Goa', 'Vagator, Goa'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Game Studio', 'Garden Sanctuary', 'Creative Solitude'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 4,
      workStyle: 'remote',
      guestPolicy: 'flexible',
      petTolerance: ['dogs', 'cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'pranav-nambiar',
    userId: 'user-pranav',
    displayName: 'Pranav Nambiar',
    headline: 'Aerospace Systems Engineer & Jazz Trumpeter',
    avatarUrl:
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    bio: 'Aerodynamics lead for eVTOL prototypes. Acoustic practice strictly in sound-isolated recording booths. Seeking flat in Domlur or Indiranagar.',
    budgetRange: { min: 18000, max: 28000, currency: 'INR' },
    preferredLocations: ['Domlur, Bengaluru', 'Indiranagar, Bengaluru'],
    visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Aviation Tech', 'Sound Isolation', 'Punctual Co-living'],
    lifestyleDNA: {
      chronotype: 'balanced',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'rhea-bhattacharya',
    userId: 'user-rhea',
    displayName: 'Rhea Bhattacharya',
    headline: 'Bio-informatics Researcher & Classical Sitarist',
    avatarUrl:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    bio: 'Analyzing genomic sequences at national labs. Love morning classical sitar riyaaz with practice mutes and a peaceful South Kolkata flat.',
    budgetRange: { min: 12000, max: 19000, currency: 'INR' },
    preferredLocations: ['Salt Lake, Kolkata', 'New Town, Kolkata'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Genomics Science', 'Classical Arts', 'Academic Focus'],
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
    id: 'harshvardhan-rathore',
    userId: 'user-harsh',
    displayName: 'Harshvardhan Rathore',
    headline: 'Cinematographer & Film Archivist',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'Shooting long-form independent cinema. Looking for a high-ceiling sunlit loft in Juhu near the beach with darkroom workspace.',
    budgetRange: { min: 32000, max: 58000, currency: 'INR' },
    preferredLocations: ['Juhu, Mumbai', 'Versova, Mumbai'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Cinema Archivist', 'Beach Walk', 'High Ceiling Loft'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 4,
      workStyle: 'hybrid',
      guestPolicy: 'flexible',
      petTolerance: ['cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'tanvi-shenoy',
    userId: 'user-tanvi',
    displayName: 'Tanvi Shenoy',
    headline: 'Typeface Designer & Heritage Walker',
    avatarUrl:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
    bio: 'Drawing Indic typography. Early morning filter coffee at CTR, quiet focus, and plant-filled balconies in Malleshwaram or Sadashivnagar.',
    budgetRange: { min: 17000, max: 26000, currency: 'INR' },
    preferredLocations: ['Malleshwaram, Bengaluru', 'Sadashivnagar, Bengaluru'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Heritage Bengaluru', 'Typography', 'Filter Coffee'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'aman-qureshi',
    userId: 'user-aman',
    displayName: 'Aman Qureshi',
    headline: 'Marine Biologist & Coastal Photographer',
    avatarUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    bio: 'Researching coral restoration along the Coromandel coast. Quiet, minimalist habits, and clean shared living in Alwarpet.',
    budgetRange: { min: 15000, max: 24000, currency: 'INR' },
    preferredLocations: ['Alwarpet, Chennai', 'Mylapore, Chennai'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Marine Science', 'Coastal Culture', 'Minimalist'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'rarely',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'simran-sethi',
    userId: 'user-simran',
    displayName: 'Simran Sethi',
    headline: 'Renewable Energy Strategist & Tennis Player',
    avatarUrl:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    bio: 'Working on solar micro-grid financing. 6:00 AM tennis workouts, clean meal preps, and respectful quiet living on Golf Course Road.',
    budgetRange: { min: 25000, max: 42000, currency: 'INR' },
    preferredLocations: ['Golf Course Road, Gurugram', 'DLF Phase 5, Gurugram'],
    visualTags: ['Aadhaar Verified', 'Early Riser', 'Tennis Athlete', 'Clean Tech', 'Structured Routines'],
    lifestyleDNA: {
      chronotype: 'early_bird',
      cleanlinessLevel: 5,
      socialEnergy: 4,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'omkar-gokhale',
    userId: 'user-omkar',
    displayName: 'Omkar Gokhale',
    headline: 'Deep Tech Founder & Vinyl Audiophile',
    avatarUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Building autonomous robotics perception. Need an airy flat in Aundh or Baner with high electrical safety and quiet focus hours.',
    budgetRange: { min: 16000, max: 25000, currency: 'INR' },
    preferredLocations: ['Aundh, Pune', 'Baner, Pune'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Robotics Founder', 'Vinyl Sound', 'Quiet Tech'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'flexible',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'lavanya-reddy',
    userId: 'user-lavanya',
    displayName: 'Lavanya Reddy',
    headline: 'Genomics Data Scientist & Potter',
    avatarUrl:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    bio: 'Crunching DNA sequences for personalized therapeutics. Love wheel pottery on weekends and clean organized living spaces in Gachibowli.',
    budgetRange: { min: 18000, max: 27000, currency: 'INR' },
    preferredLocations: ['Gachibowli, Hyderabad', 'Financial District, Hyderabad'],
    visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Genomics', 'Studio Pottery', 'Organized Living'],
    lifestyleDNA: {
      chronotype: 'balanced',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'hybrid',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'farhan-akhtar-mirza',
    userId: 'user-farhan',
    displayName: 'Farhan Mirza',
    headline: 'Screenwriter & Ocean Kayaker',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Writing cinematic features for international festivals. Looking for a sea-facing room in Versova with calm breeze and creative synergy.',
    budgetRange: { min: 25000, max: 42000, currency: 'INR' },
    preferredLocations: ['Versova, Mumbai', 'Juhu, Mumbai'],
    visualTags: ['Aadhaar Verified', 'Night Owl', 'Screenwriting', 'Ocean Views', 'Creative Discipline'],
    lifestyleDNA: {
      chronotype: 'night_owl',
      cleanlinessLevel: 4,
      socialEnergy: 4,
      workStyle: 'remote',
      guestPolicy: 'flexible',
      petTolerance: ['cats', 'plants'],
      smokingTolerance: false,
    },
  },
  {
    id: 'arundhati-das',
    userId: 'user-arundhati',
    displayName: 'Arundhati Das',
    headline: 'Generative AI Artist & Urban Sketcher',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Blending traditional wash painting with diffusion models. Seeking a light-flooded modern apartment in New Town with expansive balcony views.',
    budgetRange: { min: 14000, max: 23000, currency: 'INR' },
    preferredLocations: ['New Town, Kolkata', 'Salt Lake, Kolkata'],
    visualTags: ['Aadhaar Verified', 'Balanced Rhythm', 'Generative Art', 'Balcony Views', 'Thoughtful Living'],
    lifestyleDNA: {
      chronotype: 'balanced',
      cleanlinessLevel: 5,
      socialEnergy: 3,
      workStyle: 'remote',
      guestPolicy: 'weekends_only',
      petTolerance: ['plants'],
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
      'High-Speed 1 Gbps Fiber WiFi',
      'Daily Cook & Housekeeping Shared',
      'Quiet Hours Protocol (10:30 PM - 7:30 AM)',
      'Solar Heated Water & Power Backup',
      'Modern Modular Kitchen & Dishwasher',
      'Teak Study Desk & Ergonomic Chair',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
    galleryImages: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJfZh2AkHLiWeIMVRiVBEvrekrs7IqEWr1Py0aJiWvJUzogR0emd_5v9JVwH7_iaqfEm7F8OgNWv2FEuO5i3JX6NVx8mHfnRvL_MGzQUqiooVHoMBMTN-PvnWtN1YACurcrHKjKugPhuEO-Nti6CRMfZMO0zleQ9utZd-3NtXA1Y7jXz-z_6l_5Yo3BGT1bVcjTwUg73KD8Oggs-EtspKVWQgGvWnEvFl6ynyVewg0nCTxMHVYLFVcmQ',
        title: 'Master Studio & Sunlit Balcony',
        category: 'Private Bedroom',
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
    ],
    cohabitants: ['Ananya Sharma (Verified Architect)', 'Rohan Patil (AI Researcher)'],
    isAvailable: true,
    coordinates: [77.6412, 12.9716],
  },
  {
    id: 'the-bandra-heritage-duplex',
    title: 'The Bandra Heritage Duplex',
    description:
      'High-ceiling master room with vintage mosaic tiles and acoustic isolation in Ranwar Village, Bandra West.',
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
    ],
    cohabitants: ['Aarav Mehta (Verified Resident)', 'Aditya Kulkarni (Brand Strategist)'],
    isAvailable: true,
    coordinates: [72.8295, 19.0596],
  },
  {
    id: 'the-baner-sanctuary',
    title: 'The Baner Minimalist Flat',
    description:
      'Quiet, airy room facing the Pashan hill line. Modern kitchen, water purifier, and dedicated ergonomic workstation in Baner.',
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
    cohabitants: ['Rohan Patil (Verified AI Researcher)', 'Nikhil Joshi (Materials Designer)'],
    isAvailable: true,
    coordinates: [73.7868, 18.5590],
  },
  {
    id: 'the-hauz-khas-loft',
    title: 'The Hauz Khas Creative Loft',
    description:
      'Artisan-designed penthouse room overlooking Hauz Khas forest line. Expansive natural lighting and timber bookshelves.',
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
    cohabitants: ['Kavya Menon (Verified Resident)', 'Tara Sen (Ambient Musician)'],
    isAvailable: true,
    coordinates: [77.1945, 28.5494],
  },
  {
    id: 'assagao-portuguese-sanctuary',
    title: 'The Assagao Portuguese Villa',
    description:
      'Charming heritage room with laterite stone walls, high wooden ceilings, and garden verandah in Assagao, North Goa.',
    neighborhood: 'Assagao',
    city: 'Goa',
    state: 'Goa',
    monthlyRent: 34000,
    deposit: 60000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Starlink & Fiber Dual Internet',
      'Private Verandah & Garden',
      'Organic Herb Garden',
      'Air Conditioning & Power Inverter',
      'Artisan Outdoor Kitchen',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Tara Alvares (Landscape Architect)', 'Natasha Lobo (Creative Director)'],
    isAvailable: true,
    coordinates: [73.7712, 15.5910],
  },
  {
    id: 'jubilee-hills-architectural-suite',
    title: 'The Jubilee Hills Studio Suite',
    description:
      'Architecturally designed room overlooking the Jubilee Hills rocky ridge. Floor-to-ceiling glass, acoustic curtains, and custom teak desk.',
    neighborhood: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    monthlyRent: 28000,
    deposit: 56000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      '1 Gbps ACT Fiber WiFi',
      'Private Terrace Garden',
      'Gourmet Shared Kitchen',
      'Covered Basement Parking',
      'Acoustic Soundproofing',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Aniruddh Varma (Principal UX)', 'Arjun Rao (Cloud Architect)'],
    isAvailable: true,
    coordinates: [78.4068, 17.4319],
  },
  {
    id: 'lavelle-road-heritage-residency',
    title: 'The Lavelle Road Garden Penthouse',
    description:
      'Exclusive high-ceiling penthouse suite overlooking ancient raintrees in central Bengaluru. Pure heritage charm with modern amenities.',
    neighborhood: 'Lavelle Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    monthlyRent: 42000,
    deposit: 84000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Fiber 1 Gbps Internet',
      'Dedicated Housekeeping & Chef',
      'Wrap-around Balcony Canopy',
      'Private Study & Library',
      'Covered Parking & EV Charging',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Ananya Sharma (Architect)', 'Tanvi Shenoy (Type Designer)'],
    isAvailable: true,
    coordinates: [77.5975, 12.9719],
  },
  {
    id: 'juhu-coastal-sunlit-loft',
    title: 'The Juhu Beachside Suite',
    description:
      'Sunlit sea-breeze suite just 200 meters from Juhu Beach. Acoustic double glazing, Italian marble flooring, and private balcony.',
    neighborhood: 'Juhu',
    city: 'Mumbai',
    state: 'Maharashtra',
    monthlyRent: 45000,
    deposit: 90000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'High-Speed Fiber Network',
      'Sea Facing Balcony',
      'Soundproof Triple Glazing',
      'Daily Maid & Laundry Service',
      'Gourmet Island Kitchen',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Harshvardhan Rathore (Cinematographer)', 'Farhan Mirza (Writer)'],
    isAvailable: true,
    coordinates: [72.8258, 19.1028],
  },
  {
    id: 'cyber-city-sky-residency',
    title: 'The Cyber City Sky Loft',
    description:
      'Panoramic 24th-floor room on Golf Course Road. Expansive Aravali forest views, central air purification, and concierge service.',
    neighborhood: 'Golf Course Road',
    city: 'Delhi',
    state: 'Delhi NCR',
    monthlyRent: 29000,
    deposit: 58000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Central HEPA Air Filtration',
      'Olympic Swimming Pool & Gym',
      'High-Speed Multi-WAN Fiber',
      'Rapid Metro Walking Distance',
      '24/7 Concierge & Security',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Devansh Singhania (Quant Manager)', 'Simran Sethi (Energy Strategist)'],
    isAvailable: true,
    coordinates: [77.0878, 28.4595],
  },
  {
    id: 'adyar-riverview-sanctuary',
    title: 'The Adyar Riverview Suite',
    description:
      'Tranquil coastal room overlooking the Adyar river estuary. Breezy balconies, terracotta flooring, and peaceful silence.',
    neighborhood: 'Adyar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    monthlyRent: 19500,
    deposit: 39000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Estuary Ocean Breeze',
      'Fiber Internet 300 Mbps',
      'Solar Hot Water System',
      'Terracotta Open Balcony',
      'Quiet Hours Protocol',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Meera Iyer (Classical Vocalist)', 'Karthik Sundaram (Robotics Eng)'],
    isAvailable: true,
    coordinates: [80.2570, 13.0012],
  },
  {
    id: 'ballygunge-circular-rowhouse',
    title: 'The Ballygunge Art Studio',
    description:
      'Classic South Kolkata rowhouse suite with high ceilings, louvered teak shutters, red oxide floors, and quiet courtyard.',
    neighborhood: 'Ballygunge',
    city: 'Kolkata',
    state: 'West Bengal',
    monthlyRent: 18000,
    deposit: 36000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Heritage Teak Shutters & Balcony',
      'High-Speed Fiber WiFi',
      'Inverter Power Backup',
      'Courtyard Book Reading Nook',
      'Shared Kitchen & Laundry',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Vikramaditya Sen (Computational Linguist)', 'Shreya Mukherjee (Audio Producer)'],
    isAvailable: true,
    coordinates: [88.3639, 22.5280],
  },
  {
    id: 'hsr-layout-creator-attic',
    title: 'The HSR Layout Creator Loft',
    description:
      'Modern top-floor studio with private terrace garden, ergonomic setup, and direct natural lighting in HSR Sector 3.',
    neighborhood: 'HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    monthlyRent: 23500,
    deposit: 47000,
    roomType: 'private_room',
    furnishing: 'fully_furnished',
    amenities: [
      'Private Terrace Herb Garden',
      'Dual 500 Mbps Fiber Backup',
      'Ergonomic Sit-Stand Desk',
      'Solar Inverter Backup',
      'Modern Modular Kitchen',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    cohabitants: ['Pooja Hegde (UX Lead)', 'Pranav Nambiar (Aerospace Eng)'],
    isAvailable: true,
    coordinates: [77.6387, 12.9121],
  },
];

export const ACTIVE_INDIAN_STAY: IndianStayData = {
  id: 'stay-indiranagar-loft',
  title: 'The Indiranagar Sanctuary',
  neighborhood: 'Indiranagar 12th Main',
  city: 'Bengaluru',
  state: 'Karnataka',
  daysActive: 168,
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
    availableRoomsCount: 24,
    verifiedResidentsCount: 142,
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
        roomId: 'hsr-layout-creator-attic',
      },
      {
        id: 'lavelle-road',
        name: 'Lavelle Road',
        character: 'Heritage Luxury, High Ceilings & Quiet Mansions',
        rentRange: '₹35,000 – ₹60,000 / mo',
        commute: 'Cubbon Park Metro & MG Road central access',
        lifestyle: 'Tree-covered private avenues, upscale bistro culture, and architectural heritage.',
        roommateFit: 'Founders, design leaders, and executive residents.',
        roomId: 'lavelle-road-heritage-residency',
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
    availableRoomsCount: 18,
    verifiedResidentsCount: 138,
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
        roomId: 'juhu-coastal-sunlit-loft',
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
    availableRoomsCount: 16,
    verifiedResidentsCount: 96,
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
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '06:00 AM – 08:00 AM',
        title: 'Baner Hill Sunrise Hike',
        activity: 'Scenic morning walk to the top of Baner Tekdi with panoramic valley views.',
        tag: 'Nature Sync',
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
    availableRoomsCount: 20,
    verifiedResidentsCount: 118,
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
        roomId: 'cyber-city-sky-residency',
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
    ],
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    tagline: 'Granite Hills & Next-Gen Innovation',
    description:
      'Dynamic tech corridors set amidst dramatic granite boulders and tranquil Deccan lakes. Experience spacious modern studios, culinary excellence, and vibrant co-living spaces.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    livingCostRange: '₹14,000 – ₹36,000 / mo',
    vibeTags: ['Jubilee Hills Rock Formations', 'Deccan Chai', 'HITEC City', 'Spacious Studios'],
    transitInfo: 'Hyderabad Metro Blue & Red lines + Outer Ring Road transit corridors.',
    workCulture: 'Cloud architects, UX leaders, and bio-tech researchers collaborating in sun-drenched hill-facing studios.',
    availableRoomsCount: 15,
    verifiedResidentsCount: 88,
    curatedRoomId: 'jubilee-hills-architectural-suite',
    featuredResidentId: 'arjun-rao',
    neighborhoods: [
      {
        id: 'jubilee-hills',
        name: 'Jubilee Hills',
        character: 'Artistic Enclaves, Upscale Cafés & Hillside Sanctuaries',
        rentRange: '₹22,000 – ₹38,000 / mo',
        commute: 'Blue Line Metro (Road No 5 / Peddamma Temple)',
        lifestyle: 'Quiet private lanes, specialty coffee roasters, and expansive modern living spaces.',
        roommateFit: 'Designers, entrepreneurs, and lifestyle purists.',
        roomId: 'jubilee-hills-architectural-suite',
      },
      {
        id: 'gachibowli',
        name: 'Gachibowli',
        character: 'Modern Tech Campuses & Gated Living',
        rentRange: '₹14,000 – ₹26,000 / mo',
        commute: 'Outer Ring Road & HITEC City corridors',
        lifestyle: 'Fitness communities, Olympic sports facilities, and clean gated flats.',
        roommateFit: 'Software engineers, bio-informatics scientists, and analysts.',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '06:30 AM – 08:30 AM',
        title: 'KBR Park Canopy Jog',
        activity: 'Lush morning jog around the protected botanical sanctuary of KBR Park.',
        tag: 'Morning Routine',
      },
    ],
  },
  {
    id: 'goa',
    city: 'Goa',
    state: 'Goa',
    tagline: 'Coastal Slow Living & Heritage Architecture',
    description:
      'Where ancient Portuguese villas and tropical palm groves meet thoughtful remote creators. A haven for slow, mindful, and high-resonance communal living.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    livingCostRange: '₹22,000 – ₹48,000 / mo',
    vibeTags: ['Portuguese Villas', 'Coastal Rhythms', 'Organic Permaculture', 'Creative Havens'],
    transitInfo: 'Coastal highway spine, scooter networks, and proximity to MOPA International Airport.',
    workCulture: 'Creative directors, landscape architects, and game developers operating from tranquil garden villas.',
    availableRoomsCount: 12,
    verifiedResidentsCount: 76,
    curatedRoomId: 'assagao-portuguese-sanctuary',
    featuredResidentId: 'tara-alvares',
    neighborhoods: [
      {
        id: 'assagao',
        name: 'Assagao',
        character: 'Heritage Village, Shaded Byways & Farm-to-Table Dining',
        rentRange: '₹25,000 – ₹45,000 / mo',
        commute: 'Central North Goa arterial connectivity',
        lifestyle: 'Artisanal bakeries, slow morning walks through Portuguese lanes, and high-speed fiber setups.',
        roommateFit: 'Writers, architects, and remote creative leaders.',
        roomId: 'assagao-portuguese-sanctuary',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '07:00 AM – 09:00 AM',
        title: 'Verandah Espresso & Garden Walk',
        activity: 'Brew fresh estate coffee on the tiled verandah overlooking organic flora.',
        tag: 'Tropical Living',
      },
    ],
  },
  {
    id: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Coastal Heritage & Deep Intellectual Discipline',
    description:
      'The Coromandel coast’s cultural epicenter. Towering banyan canopies, morning carnatic music riyaaz, coastal breezes, and disciplined technical research centers.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
    livingCostRange: '₹14,000 – ₹28,000 / mo',
    vibeTags: ['Adyar Estuary', 'Carnatic Music', 'Coastal Surfing', 'Disciplined Living'],
    transitInfo: 'Chennai Metro Green & Blue lines + MRTS coastal transit and OMR tech corridor.',
    workCulture: 'Robotics researchers, classical artists, and system architects maintaining harmonious morning routines.',
    availableRoomsCount: 14,
    verifiedResidentsCount: 82,
    curatedRoomId: 'adyar-riverview-sanctuary',
    featuredResidentId: 'meera-iyer',
    neighborhoods: [
      {
        id: 'adyar',
        name: 'Adyar & Besant Nagar',
        character: 'Theosophical Greens, Estuary Views & Seafront Living',
        rentRange: '₹16,000 – ₹30,000 / mo',
        commute: 'Coastal MRTS & direct OMR access',
        lifestyle: 'Elliot’s Beach walks at dawn, traditional filter coffee rituals, and peaceful residential lanes.',
        roommateFit: 'Classical artists, hardware engineers, and researchers.',
        roomId: 'adyar-riverview-sanctuary',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '06:00 AM – 08:00 AM',
        title: 'Elliot’s Beach Sunrise Walk',
        activity: 'Calm morning ocean breeze walk along Besant Nagar beach.',
        tag: 'Coastal Morning',
      },
    ],
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    tagline: 'Literary Grandeur & High-Ceiling Heritage',
    description:
      'Where colonial red-oxide floors, louvered teak balconies, and sprawling libraries meet modern AI and design. Experience unmatched cultural warmth and historic architecture.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    livingCostRange: '₹12,000 – ₹24,000 / mo',
    vibeTags: ['High Ceilings', 'Literary Adda', 'Heritage Balconies', 'Red Oxide Floors'],
    transitInfo: 'Kolkata Metro North-South & East-West Green lines + classic tramways.',
    workCulture: 'Computational linguists, documentary producers, and generative artists living in spacious heritage apartments.',
    availableRoomsCount: 16,
    verifiedResidentsCount: 94,
    curatedRoomId: 'ballygunge-circular-rowhouse',
    featuredResidentId: 'vikramaditya-sen',
    neighborhoods: [
      {
        id: 'ballygunge',
        name: 'Ballygunge & Southern Avenue',
        character: 'Lush Lake Canopies, Art Galleries & Vintage Mansions',
        rentRange: '₹14,000 – ₹26,000 / mo',
        commute: 'Ballygunge Circular transit & Kalighat Metro link',
        lifestyle: 'Morning strolls around Rabindra Sarobar lake, heritage bookstore visits, and classical music salons.',
        roommateFit: 'Scholars, writers, audio producers, and artists.',
        roomId: 'ballygunge-circular-rowhouse',
      },
    ],
    livingItinerary: [
      {
        phase: 'Morning',
        time: '06:30 AM – 08:30 AM',
        title: 'Rabindra Sarobar Lake Walk',
        activity: 'Peaceful morning walk under towering mahogany and rain trees.',
        tag: 'Heritage Morning',
      },
    ],
  },
];
