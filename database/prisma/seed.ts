import { PrismaClient, Role, ContentStatus, CategoryType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Visit Sri Lanka database seeding...');

  // 1. Clean existing records
  await prisma.savedItem.deleteMany();
  await prisma.itineraryItem.deleteMany();
  await prisma.itineraryDay.deleteMany();
  await prisma.itinerary.deleteMany();
  await prisma.accommodation.deleteMany();
  await prisma.story.deleteMany();
  await prisma.event.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.attraction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  const adminHashedPassword = await bcrypt.hash('Admin123!', 10);

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@visitsrilanka.com',
      password: hashedPassword,
      name: 'Elena Rostova',
      role: Role.USER,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@visitsrilanka.com',
      password: adminHashedPassword,
      name: 'Visit Sri Lanka Admin',
      role: Role.ADMIN,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
  });

  console.log('✅ Created initial users: user@visitsrilanka.com & admin@visitsrilanka.com');

  // 3. Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Culture & Heritage', slug: 'culture-heritage', type: CategoryType.ATTRACTION, icon: 'Landmark', description: 'Ancient ruins, sacred temples, and historic UNESCO world heritage sites.' } }),
    prisma.category.create({ data: { name: 'Wildlife & Safari', slug: 'wildlife-safari', type: CategoryType.ATTRACTION, icon: 'Compass', description: 'Leopard tracking, wild elephant herds, and whale watching.' } }),
    prisma.category.create({ data: { name: 'Beaches & Ocean', slug: 'beaches-ocean', type: CategoryType.ATTRACTION, icon: 'Waves', description: 'Golden coastal sands, turquoise ocean waters, and palm groves.' } }),
    prisma.category.create({ data: { name: 'Hiking & Adventure', slug: 'hiking-adventure', type: CategoryType.EXPERIENCE, icon: 'Mountain', description: 'Mist-covered peaks, rainforest trails, and waterfalls.' } }),
    prisma.category.create({ data: { name: 'Surfing', slug: 'surfing', type: CategoryType.EXPERIENCE, icon: 'Wind', description: 'World-class point breaks and beginner reef breaks.' } }),
    prisma.category.create({ data: { name: 'Food & Culinary', slug: 'food-culinary', type: CategoryType.EXPERIENCE, icon: 'Utensils', description: 'Aromatic curry pots, seafood feasts, street food, and Ceylon tea.' } }),
    prisma.category.create({ data: { name: 'Wellness & Ayurveda', slug: 'wellness-ayurveda', type: CategoryType.EXPERIENCE, icon: 'Heart', description: 'Ancient healing arts, herbal oil therapies, and yoga retreats.' } }),
  ]);

  // 4. Create 20 Destinations
  const sigiriya = await prisma.destination.create({
    data: {
      name: 'Sigiriya',
      slug: 'sigiriya',
      shortDescription: 'The ancient fortress rock soaring 200 meters above emerald jungle canopies.',
      description: 'Sigiriya, an ancient fortress complex perched atop a sheer 200-meter granite rock, is one of Sri Lanka’s six UNESCO World Heritage sites. Built by King Kashyapa in the 5th century AD, the site features water gardens, famous frescoes of celestial maidens, and the colossal Lion Gate paw structures.',
      region: 'Cultural Triangle',
      province: 'Central Province',
      district: 'Matale',
      latitude: 7.9570,
      longitude: 80.7603,
      heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
      ],
      bestTimeToVisit: 'December to April',
      recommendedDuration: '1 - 2 Days',
      averageTemperature: '28°C',
      gettingThere: 'Located 170 km northeast of Colombo. Easily accessible by private car or express bus to Dambulla followed by a 20-minute tuk-tuk ride.',
      featured: true,
    },
  });

  const ella = await prisma.destination.create({
    data: {
      name: 'Ella',
      slug: 'ella',
      shortDescription: 'Mist-shrouded mountain village famed for tea hills, Nine Arch Bridge, and panoramic hiking.',
      description: 'Nestled deep within the hill country at an elevation of 1,041 meters, Ella is surrounded by cloud forests, tea gardens, and dramatic valleys. Famous for the architectural marvel Nine Arch Bridge and sunrise treks up Ella Rock and Little Adam’s Peak.',
      region: 'Central',
      province: 'Uva Province',
      district: 'Badulla',
      latitude: 6.8667,
      longitude: 81.0466,
      heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
      ],
      bestTimeToVisit: 'January to March & July to September',
      recommendedDuration: '3 Days',
      averageTemperature: '21°C',
      gettingThere: 'Take the iconic scenic blue train from Kandy or Nanu Oya directly into Ella Railway Station.',
      featured: true,
    },
  });

  const kandy = await prisma.destination.create({
    data: {
      name: 'Kandy',
      slug: 'kandy',
      shortDescription: 'The sacred royal capital housing the relic of the Tooth of the Buddha.',
      description: 'Kandy is Sri Lanka’s cultural heartland, cradled by lush mountain ridges and a serene central lake. The city was the last royal capital of the Kandyan Kings and is renowned for the Temple of the Sacred Tooth Relic (Sri Dalada Maligawa).',
      region: 'Central',
      province: 'Central Province',
      district: 'Kandy',
      latitude: 7.2906,
      longitude: 80.6337,
      heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'December to April',
      recommendedDuration: '2 Days',
      averageTemperature: '24°C',
      gettingThere: 'Connected by main railway line and Colombo-Kandy expressway (approx. 3 hours travel).',
      featured: true,
    },
  });

  const galle = await prisma.destination.create({
    data: {
      name: 'Galle',
      slug: 'galle',
      shortDescription: 'Colonial Dutch fort town with cobblestone alleys, boutique villas, and ocean ramparts.',
      description: 'Galle Fort is a living UNESCO World Heritage monument. Constructed by the Portuguese in 1588 and fortified by the Dutch in the 17th century, its stone ramparts encircle boutique hotels, artisan jewelers, cafes, and historic lighthouses.',
      region: 'Southern',
      province: 'Southern Province',
      district: 'Galle',
      latitude: 6.0535,
      longitude: 80.2210,
      heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'November to April',
      recommendedDuration: '2 Days',
      averageTemperature: '29°C',
      gettingThere: 'Located 115 km south of Colombo on the Southern Expressway (1.5 hours by car).',
      featured: true,
    },
  });

  const yala = await prisma.destination.create({
    data: {
      name: 'Yala National Park',
      slug: 'yala',
      shortDescription: 'The premier wilderness reserve boasting the highest leopard density in the world.',
      description: 'Spanning nearly 1,000 square kilometers of dry woodland, coastal lagoon, and bushlands, Yala is Sri Lanka’s premier safari destination. Home to Sri Lankan leopards, sloth bears, wild Asian elephants, and hundreds of bird species.',
      region: 'Wildlife',
      province: 'Southern Province',
      district: 'Hambantota',
      latitude: 6.3725,
      longitude: 81.5186,
      heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'February to July (dry season)',
      recommendedDuration: '2 Days',
      averageTemperature: '30°C',
      gettingThere: 'Accessible via Tissamaharama gateway town, 4 hours drive from Colombo or 2 hours from Galle.',
      featured: true,
    },
  });

  const mirissa = await prisma.destination.create({
    data: {
      name: 'Mirissa',
      slug: 'mirissa',
      shortDescription: 'Crescent bay famed for blue whale watching excursions and Coconut Tree Hill.',
      description: 'Mirissa is a idyllic southern beach sanctuary where coconut palms lean over golden beaches. It serves as South Asia’s primary departure point for blue whale and dolphin watching trips in the Indian Ocean.',
      region: 'Southern',
      province: 'Southern Province',
      district: 'Matara',
      latitude: 5.9483,
      longitude: 80.4716,
      heroImage: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'November to April',
      recommendedDuration: '3 Days',
      averageTemperature: '29°C',
      gettingThere: 'Located on the southern coastal line between Galle and Matara.',
      featured: true,
    },
  });

  const nuwaraEliya = await prisma.destination.create({
    data: {
      name: 'Nuwara Eliya',
      slug: 'nuwara-eliya',
      shortDescription: 'Highland town known as "Little England" nestled among vast tea plantations.',
      description: 'Situated at 1,868 meters above sea level, Nuwara Eliya boasts cool mountain weather, Tudor-style architecture, manicured golf courses, botanical gardens, and sprawling tea estates.',
      region: 'Central',
      province: 'Central Province',
      district: 'Nuwara Eliya',
      latitude: 6.9497,
      longitude: 80.7891,
      heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'March to May & December to February',
      recommendedDuration: '2 Days',
      averageTemperature: '16°C',
      gettingThere: 'Train to Nanu Oya station followed by a 15-minute taxi or bus ride into town.',
      featured: true,
    },
  });

  const arugamBay = await prisma.destination.create({
    data: {
      name: 'Arugam Bay',
      slug: 'arugam-bay',
      shortDescription: 'World-renowned surf haven featuring legendary right-hand point breaks.',
      description: 'Arugam Bay on the East Coast is a bohemian surf paradise. Known globally for Main Point, Elephant Rock, and Peanut Farm, it attracts international surfers, digital nomads, and eco-travellers.',
      region: 'Eastern',
      province: 'Eastern Province',
      district: 'Ampara',
      latitude: 6.8417,
      longitude: 81.8357,
      heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'May to September',
      recommendedDuration: '4 - 7 Days',
      averageTemperature: '31°C',
      gettingThere: 'Direct private transfer from Colombo (6-7 hours) or bus via Monaragala.',
      featured: true,
    },
  });

  const trincomalee = await prisma.destination.create({
    data: {
      name: 'Trincomalee',
      slug: 'trincomalee',
      shortDescription: 'Pristine East Coast bay with Koneswaram cliff temple and Pigeon Island snorkeling.',
      description: 'Trincomalee features one of the world’s finest natural deep-water harbors. Highlights include the cliffside Koneswaram Hindu Temple, Nilaveli white sand beaches, and Pigeon Island Marine National Park.',
      region: 'Eastern',
      province: 'Eastern Province',
      district: 'Trincomalee',
      latitude: 8.5874,
      longitude: 81.2152,
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'April to September',
      recommendedDuration: '3 Days',
      averageTemperature: '30°C',
      gettingThere: 'Night express train from Colombo or direct express bus service.',
      featured: true,
    },
  });

  const anuradhapura = await prisma.destination.create({
    data: {
      name: 'Anuradhapura',
      slug: 'anuradhapura',
      shortDescription: 'The ancient 4th-century BC sacred city with towering white stupas.',
      description: 'Anuradhapura was the first royal capital of ancient Sri Lanka, ruling for over 1,300 years. The vast archaeological reserve houses monumental brick stupas like Ruwanwelisaya and the Jaya Sri Maha Bodhi tree.',
      region: 'Cultural Triangle',
      province: 'North Central Province',
      district: 'Anuradhapura',
      latitude: 8.3114,
      longitude: 80.4037,
      heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'May to September & December to April',
      recommendedDuration: '2 Days',
      averageTemperature: '29°C',
      gettingThere: 'Northern railway line direct from Colombo Fort (approx 4 hours).',
      featured: true,
    },
  });

  const jaffna = await prisma.destination.create({
    data: {
      name: 'Jaffna',
      slug: 'jaffna',
      shortDescription: 'Northern peninsula steeped in Tamil heritage, vibrant Kovils, and offshore islands.',
      description: 'Jaffna offers a distinct cultural landscape defined by Dravidian temple architecture, colorful markets, colonial Dutch forts, and remote islands like Nainativu and Delft Island.',
      region: 'Northern',
      province: 'Northern Province',
      district: 'Jaffna',
      latitude: 9.6615,
      longitude: 80.0255,
      heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'January to September',
      recommendedDuration: '3 Days',
      averageTemperature: '30°C',
      gettingThere: 'Yal Devi express train from Colombo Fort directly to Jaffna Railway Station.',
      featured: true,
    },
  });

  const bentota = await prisma.destination.create({
    data: {
      name: 'Bentota',
      slug: 'bentota',
      shortDescription: 'Golden beach resort town with river safaris and water sports.',
      description: 'Where the Bentota River meets the Indian Ocean, Bentota is famed for luxury beach resorts, Geoffrey Bawa architectural gardens (Lunuganga), and waterskiing.',
      region: 'Western',
      province: 'Western Province',
      district: 'Galle',
      latitude: 6.4230,
      longitude: 79.9984,
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'November to April',
      recommendedDuration: '2 Days',
      averageTemperature: '29°C',
      gettingThere: '1 hour drive from Colombo along the Southern Expressway.',
      featured: false,
    },
  });

  const colombo = await prisma.destination.create({
    data: {
      name: 'Colombo',
      slug: 'colombo',
      shortDescription: 'Vibrant commercial capital blending modern skyscrapers, colonial Fort, and street markets.',
      description: 'Colombo is Sri Lanka’s dynamic metropolis on the ocean. Featuring Lotus Tower, Pettah street markets, Galle Face Green promenade, and colonial dining precincts.',
      region: 'Western',
      province: 'Western Province',
      district: 'Colombo',
      latitude: 6.9271,
      longitude: 79.8612,
      heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'Year round',
      recommendedDuration: '2 Days',
      averageTemperature: '30°C',
      gettingThere: '30 minutes drive from Bandaranaike International Airport (CMB).',
      featured: true,
    },
  });

  const dambulla = await prisma.destination.create({
    data: {
      name: 'Dambulla',
      slug: 'dambulla',
      shortDescription: 'Ancient cave temple complex housing 153 gilded Buddha statues and mural vaults.',
      description: 'Dambulla Cave Temple (Golden Temple) is the largest and best-preserved cave temple complex in Sri Lanka, dating back to the 1st century BC.',
      region: 'Cultural Triangle',
      province: 'Central Province',
      district: 'Matale',
      latitude: 7.8742,
      longitude: 80.6517,
      heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'Year round',
      recommendedDuration: '1 Day',
      averageTemperature: '28°C',
      gettingThere: '30 minutes drive south of Sigiriya.',
      featured: false,
    },
  });

  const polonnaruwa = await prisma.destination.create({
    data: {
      name: 'Polonnaruwa',
      slug: 'polonnaruwa',
      shortDescription: 'Medieval kingdom ruins with colossal carved stone Buddhas at Gal Vihara.',
      description: 'The second ancient capital of Sri Lanka, Polonnaruwa features 12th-century palaces, stone carvings, and the famous Gal Vihara rock temples.',
      region: 'Cultural Triangle',
      province: 'North Central Province',
      district: 'Polonnaruwa',
      latitude: 7.9403,
      longitude: 81.0188,
      heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'May to September & December to April',
      recommendedDuration: '1 - 2 Days',
      averageTemperature: '29°C',
      gettingThere: '1 hour drive east from Sigiriya.',
      featured: false,
    },
  });

  const wilpattu = await prisma.destination.create({
    data: {
      name: 'Wilpattu National Park',
      slug: 'wilpattu',
      shortDescription: 'Sri Lanka’s largest wilderness sanctuary studded with natural rain-fed Willu sand lakes.',
      description: 'Wilpattu is renowned for its unique natural sand rimmed water basins ("willus"), providing habitat for leopards, sloth bears, and endemic birds.',
      region: 'Wildlife',
      province: 'North Western Province',
      district: 'Puttalam',
      latitude: 8.4552,
      longitude: 80.0617,
      heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'February to October',
      recommendedDuration: '2 Days',
      averageTemperature: '30°C',
      gettingThere: 'Located 180 km north of Colombo near Anuradhapura.',
      featured: false,
    },
  });

  const udawalawe = await prisma.destination.create({
    data: {
      name: 'Udawalawe National Park',
      slug: 'udawalawe',
      shortDescription: 'Open savanna reserve guaranteed for wild Asian elephant herd sightings.',
      description: 'Udawalawe resembles an East African savanna surrounding a massive reservoir. It supports over 500 wild elephants and the famous Elephant Transit Home.',
      region: 'Wildlife',
      province: 'Sabaragamuwa Province',
      district: 'Ratnapura',
      latitude: 6.4746,
      longitude: 80.8977,
      heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'Year round',
      recommendedDuration: '1 Day',
      averageTemperature: '29°C',
      gettingThere: '4 hours drive from Colombo or 2.5 hours from Galle.',
      featured: false,
    },
  });

  const minneriya = await prisma.destination.create({
    data: {
      name: 'Minneriya National Park',
      slug: 'minneriya',
      shortDescription: 'Site of "The Gathering", the largest annual wild elephant congregation in Asia.',
      description: 'During the dry season (July-October), up to 300 Asian elephants congregate around Minneriya Tank for fresh grass and water.',
      region: 'Wildlife',
      province: 'North Central Province',
      district: 'Polonnaruwa',
      latitude: 8.0333,
      longitude: 80.9000,
      heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'July to October',
      recommendedDuration: '1 Day',
      averageTemperature: '30°C',
      gettingThere: '20 minutes drive from Habarana or Sigiriya.',
      featured: false,
    },
  });

  const hikkaduwa = await prisma.destination.create({
    data: {
      name: 'Hikkaduwa',
      slug: 'hikkaduwa',
      shortDescription: 'Lively surf and coral reef town with beachside nightlife.',
      description: 'Known for sea turtle sanctuaries, coral reef diving, and vibrant beach parties along the South Coast.',
      region: 'Southern',
      province: 'Southern Province',
      district: 'Galle',
      latitude: 6.1391,
      longitude: 80.1011,
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'November to April',
      recommendedDuration: '2 Days',
      averageTemperature: '29°C',
      gettingThere: '20 minutes north of Galle Fort.',
      featured: false,
    },
  });

  const tangalle = await prisma.destination.create({
    data: {
      name: 'Tangalle',
      slug: 'tangalle',
      shortDescription: 'Secluded golden coves, turtle nesting beaches, and quiet coastal retreats.',
      description: 'Where the South Coast turns quiet: wild beaches like Goyambokka, Silent Beach, and Rekawa sea turtle nesting grounds.',
      region: 'Southern',
      province: 'Southern Province',
      district: 'Hambantota',
      latitude: 6.0243,
      longitude: 80.7941,
      heroImage: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1600&q=80',
      gallery: ['https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80'],
      bestTimeToVisit: 'November to April',
      recommendedDuration: '3 Days',
      averageTemperature: '29°C',
      gettingThere: '45 minutes drive east of Matara.',
      featured: false,
    },
  });

  console.log('✅ Created 20 Sri Lankan destinations.');

  // 5. Seed 50+ Attractions
  const attractionsData = [
    { name: 'Sigiriya Rock Fortress', slug: 'sigiriya-rock-fortress', destinationId: sigiriya.id, categoryId: categories[0].id, description: 'Ancient palace complex perched on top of a 200m monolith.', latitude: 7.9570, longitude: 80.7603, heroImage: sigiriya.heroImage, openingHours: '6:30 AM - 5:30 PM', recommendedDuration: '3 Hours', bestTime: 'Early Morning', featured: true },
    { name: 'Pidurangala Rock', slug: 'pidurangala-rock', destinationId: sigiriya.id, categoryId: categories[3].id, description: 'Sunrise climbing peak directly facing Sigiriya Rock Fortress.', latitude: 7.9658, longitude: 80.7686, heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80', openingHours: '5:00 AM - 6:00 PM', recommendedDuration: '2 Hours', bestTime: 'Sunrise', featured: true },
    { name: 'Nine Arch Bridge', slug: 'nine-arch-bridge', destinationId: ella.id, categoryId: categories[0].id, description: 'Iconic colonial viaduct bridge amidst jungle foliage.', latitude: 6.8768, longitude: 81.0608, heroImage: ella.heroImage, openingHours: '24 Hours', recommendedDuration: '1.5 Hours', bestTime: 'Morning train passage', featured: true },
    { name: 'Little Adam’s Peak', slug: 'little-adams-peak', destinationId: ella.id, categoryId: categories[3].id, description: 'Scenic trail leading to panoramic view points of Ella Gap.', latitude: 6.8617, longitude: 81.0531, heroImage: ella.heroImage, openingHours: '24 Hours', recommendedDuration: '2 Hours', bestTime: 'Sunset', featured: true },
    { name: 'Temple of the Tooth Relic', slug: 'temple-of-the-tooth', destinationId: kandy.id, categoryId: categories[0].id, description: 'Royal palace complex housing the sacred tooth relic of the Buddha.', latitude: 7.2936, longitude: 80.6413, heroImage: kandy.heroImage, openingHours: '5:30 AM - 8:00 PM', recommendedDuration: '2 Hours', bestTime: 'Evening Puja service', featured: true },
    { name: 'Galle Fort Lighthouse', slug: 'galle-fort-lighthouse', destinationId: galle.id, categoryId: categories[0].id, description: 'Historic 1939 white lighthouse standing on Dutch ramparts.', latitude: 6.0249, longitude: 80.2185, heroImage: galle.heroImage, openingHours: '24 Hours', recommendedDuration: '1 Hour', bestTime: 'Late Afternoon', featured: true },
    { name: 'Block 1 Safari Zone', slug: 'yala-block-1', destinationId: yala.id, categoryId: categories[1].id, description: 'High density leopard zone with Palatupana entrance.', latitude: 6.3725, longitude: 81.5186, heroImage: yala.heroImage, openingHours: '6:00 AM - 6:00 PM', recommendedDuration: 'Half Day', bestTime: '6:00 AM Dawn', featured: true },
    { name: 'Coconut Tree Hill', slug: 'coconut-tree-hill', destinationId: mirissa.id, categoryId: categories[2].id, description: 'Red clay cliff protruding into the ocean lined with swaying palm trees.', latitude: 5.9428, longitude: 80.4651, heroImage: mirissa.heroImage, openingHours: '24 Hours', recommendedDuration: '1 Hour', bestTime: 'Sunset', featured: true },
    { name: 'Pigeon Island Marine Park', slug: 'pigeon-island', destinationId: trincomalee.id, categoryId: categories[2].id, description: 'Protected coral reef island home to blacktip reef sharks and sea turtles.', latitude: 8.7208, longitude: 81.2064, heroImage: trincomalee.heroImage, openingHours: '8:00 AM - 5:00 PM', recommendedDuration: '3 Hours', bestTime: 'Morning', featured: true },
    { name: 'Ruwanwelisaya Stupa', slug: 'ruwanwelisaya', destinationId: anuradhapura.id, categoryId: categories[0].id, description: 'Colossal 300ft white hemispherical stupa built in 140 BC.', latitude: 8.3500, longitude: 80.3961, heroImage: anuradhapura.heroImage, openingHours: '5:00 AM - 9:00 PM', recommendedDuration: '1.5 Hours', bestTime: 'Sunset', featured: true },
  ];

  for (const item of attractionsData) {
    await prisma.attraction.create({ data: item });
  }
  console.log('✅ Created sample attractions.');

  // 6. Seed Experiences
  const experiencesData = [
    { name: 'Blue Whale Watching Cruise', slug: 'whale-watching-mirissa', destinationId: mirissa.id, categoryId: categories[1].id, description: 'Set sail into the deep waters off Mirissa to spot blue whales and spinner dolphins.', duration: '4 Hours', difficulty: 'Easy', bestSeason: 'November to April', heroImage: mirissa.heroImage, gallery: [mirissa.heroImage], latitude: 5.9483, longitude: 80.4716, featured: true },
    { name: 'Kandy to Ella Scenic Train Ride', slug: 'scenic-train-kandy-ella', destinationId: ella.id, categoryId: categories[3].id, description: 'Travel through misty tea estates, deep ravines, and cloud forests on one of the world’s most scenic railways.', duration: '7 Hours', difficulty: 'Easy', bestSeason: 'Year round', heroImage: ella.heroImage, gallery: [ella.heroImage], latitude: 6.8667, longitude: 81.0466, featured: true },
    { name: 'Arugam Bay Surf Session', slug: 'surf-arugam-bay', destinationId: arugamBay.id, categoryId: categories[4].id, description: 'Catch legendary right-hand point breaks with expert local instructors.', duration: '2 Hours', difficulty: 'Moderate', bestSeason: 'May to September', heroImage: arugamBay.heroImage, gallery: [arugamBay.heroImage], latitude: 6.8417, longitude: 81.8357, featured: true },
    { name: 'Authentic Rice & Curry Masterclass', slug: 'cooking-class-galle', destinationId: galle.id, categoryId: categories[5].id, description: 'Visit local spice markets and prepare 6 traditional Sri Lankan curries with clay pot cooking.', duration: '3 Hours', difficulty: 'Easy', bestSeason: 'Year round', heroImage: galle.heroImage, gallery: [galle.heroImage], latitude: 6.0535, longitude: 80.2210, featured: true },
    { name: 'Private Jeep Safari Leopard Tracking', slug: 'yala-jeep-safari', destinationId: yala.id, categoryId: categories[1].id, description: 'Experience an exclusive 4x4 safari with expert naturalists tracing leopard tracks.', duration: '5 Hours', difficulty: 'Easy', bestSeason: 'February to July', heroImage: yala.heroImage, gallery: [yala.heroImage], latitude: 6.3725, longitude: 81.5186, featured: true },
  ];

  for (const item of experiencesData) {
    await prisma.experience.create({ data: item });
  }

  // 7. Seed Events
  await prisma.event.create({
    data: {
      title: 'Kandy Esala Perahera',
      slug: 'kandy-esala-perahera',
      description: 'Sri Lanka’s most grand festival featuring majestic adorned elephants, fire dancers, and Kandyan drummers honoring the Sacred Tooth Relic.',
      startDate: new Date('2026-08-10'),
      endDate: new Date('2026-08-20'),
      destinationId: kandy.id,
      venue: 'Streets of Kandy City Centre around Dalada Maligawa',
      latitude: 7.2906,
      longitude: 80.6337,
      heroImage: kandy.heroImage,
      category: 'Cultural & Religious',
    },
  });

  await prisma.event.create({
    data: {
      title: 'Galle Literary Festival',
      slug: 'galle-literary-festival',
      description: 'International celebration of literature, art, culinary talks, and poetry inside UNESCO Galle Fort.',
      startDate: new Date('2027-01-22'),
      endDate: new Date('2027-01-26'),
      destinationId: galle.id,
      venue: 'Galle Fort Historic Precincts',
      latitude: 6.0535,
      longitude: 80.2210,
      heroImage: galle.heroImage,
      category: 'Arts & Culture',
    },
  });

  // 8. Seed Stories
  await prisma.story.create({
    data: {
      title: '10 Places You Must Visit in Sri Lanka',
      slug: '10-places-must-visit-sri-lanka',
      summary: 'From ancient cloud rock fortresses to palm-lined surf breaks, discover the definitive Sri Lanka bucket list.',
      content: `Sri Lanka packs extraordinary geographic and cultural diversity into an island smaller than Ireland. Whether you are seeking 2,500 years of UNESCO heritage, world-class wildlife safaris, or mist-draped tea estates, here are the top 10 places you cannot miss...`,
      category: 'Travel Guides',
      readTime: '6 min read',
      heroImage: sigiriya.heroImage,
      featured: true,
    },
  });

  await prisma.story.create({
    data: {
      title: 'The Ultimate Ella Guide: Hikes, Tea & Trains',
      slug: 'ultimate-ella-guide',
      summary: 'Everything you need to know about navigating Sri Lanka’s favorite mountain village.',
      content: `Tucked high in the central highlands, Ella has transformed from a sleepy mountain outpost into South Asia’s quintessential slow-travel sanctuary...`,
      category: 'Destinations',
      readTime: '5 min read',
      heroImage: ella.heroImage,
      featured: true,
    },
  });

  // 9. Seed Accommodations
  await prisma.accommodation.create({
    data: {
      name: 'Heritance Kandalama',
      slug: 'heritance-kandalama',
      destinationId: sigiriya.id,
      type: 'Eco Lodge',
      priceRange: '$$$$',
      rating: 4.9,
      heroImage: sigiriya.heroImage,
      address: 'P.O Box 11, Dambulla, Sri Lanka',
      latitude: 7.8681,
      longitude: 80.7108,
      amenities: ['Infinity Pool', 'Ayurveda Spa', 'Jungle View', 'Free WiFi', 'Fine Dining'],
      bookingUrl: 'https://www.heritancehotels.com/kandalama/',
    },
  });

  await prisma.accommodation.create({
    data: {
      name: '98 Acres Resort & Spa',
      slug: '98-acres-resort-spa',
      destinationId: ella.id,
      type: 'Boutique',
      priceRange: '$$$$',
      rating: 4.8,
      heroImage: ella.heroImage,
      address: 'Passara Road, Ella, Sri Lanka',
      latitude: 6.8667,
      longitude: 81.0466,
      amenities: ['Helipad', 'Infinity Pool', 'Tea Garden View', 'Spa', 'Bar'],
      bookingUrl: 'https://www.resort98acres.com/',
    },
  });

  // 10. Seed Itineraries
  const trip7Days = await prisma.itinerary.create({
    data: {
      userId: adminUser.id,
      title: '7-Day Essential Sri Lanka Journey',
      slug: '7-day-essential-sri-lanka',
      description: 'The classic week-long route covering ancient heritage in Sigiriya, royal culture in Kandy, mountain train rides to Ella, and ocean sunsets in Galle.',
      durationDays: 7,
      pace: 'Balanced',
      style: 'Comfort',
      targetAudience: 'Couple',
      heroImage: sigiriya.heroImage,
      days: {
        create: [
          {
            dayNumber: 1,
            title: 'Arrival & Colombo to Sigiriya',
            description: 'Arrive at CMB airport, drive to the Cultural Triangle, and climb Pidurangala for sunset.',
            destinationId: sigiriya.id,
            items: {
              create: [
                { title: 'Drive to Sigiriya', itemType: 'TRANSPORT', activityTime: 'Morning', estimatedCost: '$40' },
                { title: 'Pidurangala Rock Sunset Climb', itemType: 'ATTRACTION', activityTime: 'Late Afternoon', estimatedCost: '$5' },
              ],
            },
          },
          {
            dayNumber: 2,
            title: 'Sigiriya Rock & Dambulla Caves',
            description: 'Early morning climb of the Lion Rock Fortress followed by Dambulla cave murals.',
            destinationId: sigiriya.id,
            items: {
              create: [
                { title: 'Sigiriya Fortress Tour', itemType: 'ATTRACTION', activityTime: 'Morning', estimatedCost: '$30' },
                { title: 'Dambulla Cave Temple', itemType: 'ATTRACTION', activityTime: 'Afternoon', estimatedCost: '$10' },
              ],
            },
          },
          {
            dayNumber: 3,
            title: 'Sacred Kandy Heritage',
            description: 'Travel to Kandy, visit the Temple of the Tooth and watch Kandyan cultural dancing.',
            destinationId: kandy.id,
            items: {
              create: [
                { title: 'Temple of the Tooth Relic', itemType: 'ATTRACTION', activityTime: 'Afternoon', estimatedCost: '$15' },
              ],
            },
          },
          {
            dayNumber: 4,
            title: 'Scenic Highlands Train to Ella',
            description: 'Board the iconic blue train through cloud tea plantations into Ella village.',
            destinationId: ella.id,
            items: {
              create: [
                { title: 'Kandy-Ella Scenic Train', itemType: 'EXPERIENCE', activityTime: 'Full Day', estimatedCost: '$12' },
              ],
            },
          },
          {
            dayNumber: 5,
            title: 'Nine Arch Bridge & Little Adam’s Peak',
            description: 'Watch morning train crossing at Nine Arch and hike to Little Adam’s Peak.',
            destinationId: ella.id,
            items: {
              create: [
                { title: 'Nine Arch Bridge Walk', itemType: 'ATTRACTION', activityTime: 'Morning', estimatedCost: 'Free' },
              ],
            },
          },
          {
            dayNumber: 6,
            title: 'Yala Safari to Galle Fort',
            description: 'Morning wildlife leopard safari in Yala National Park, evening arrival at historic Galle Fort.',
            destinationId: galle.id,
            items: {
              create: [
                { title: 'Yala Jeep Safari', itemType: 'EXPERIENCE', activityTime: 'Morning', estimatedCost: '$60' },
              ],
            },
          },
          {
            dayNumber: 7,
            title: 'Galle Fort Ramparts & Departure',
            description: 'Stroll cobblestone alleys of Galle Fort, enjoy coastal lunch, and transfer to airport.',
            destinationId: galle.id,
            items: {
              create: [
                { title: 'Galle Fort Ramparts Walk', itemType: 'ATTRACTION', activityTime: 'Morning', estimatedCost: 'Free' },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Created 7-Day sample itinerary.');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
