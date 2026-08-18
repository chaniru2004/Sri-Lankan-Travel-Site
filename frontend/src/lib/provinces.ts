export interface FamousLocation {
  name: string;
  slug: string;
  description: string;
  image: string;
  videoUrl?: string;
}

export interface District {
  name: string;
  famousLocations: FamousLocation[];
}

export interface Province {
  name: string;
  slug: string;
  cue: string;
  color: string;
  image: string;
  popularPlaces: string[];
  districts: District[];
}

export function slugifyPlace(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeFamousLocation(
  entry: string | Partial<FamousLocation>,
  province: Pick<Province, 'name' | 'cue' | 'image'>,
  districtName: string
): FamousLocation {
  const name = typeof entry === 'string' ? entry : entry.name || 'Untitled Place';
  return {
    name,
    slug: typeof entry === 'string' ? slugifyPlace(name) : entry.slug || slugifyPlace(name),
    description:
      typeof entry === 'string'
        ? `${name} is one of the memorable places in ${districtName}, ${province.name}. ${province.cue} gives this stop its own character for travelers exploring the district.`
        : entry.description || `${name} is one of the memorable places in ${districtName}, ${province.name}.`,
    image: typeof entry === 'string' ? province.image : entry.image || province.image,
    videoUrl: typeof entry === 'string' ? undefined : entry.videoUrl,
  };
}

const rawProvinces = [
  {
    name: 'Northern Province',
    slug: 'northern-province',
    cue: 'Peninsula heritage',
    color: '#f43f5e',
    image: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg',
    popularPlaces: ['Jaffna', 'Delft Island', 'Nallur Kandaswamy Kovil'],
    districts: [
      { name: 'Jaffna', famousLocations: ['Nallur Kandaswamy Kovil', 'Jaffna Fort', 'Delft Island'] },
      { name: 'Kilinochchi', famousLocations: ['Iranamadu Tank', 'Kilinochchi War Memorial', 'Chundikulam National Park'] },
      { name: 'Mannar', famousLocations: ['Mannar Island', 'Baobab Tree', 'Adam’s Bridge'] },
      { name: 'Mullaitivu', famousLocations: ['Mullaitivu Beach', 'Nanthi Kadal Lagoon', 'Kokkilai Bird Sanctuary'] },
      { name: 'Vavuniya', famousLocations: ['Madukanda Vihara', 'Vavuniya Archaeological Museum', 'Kaludiya Pokuna Forest'] },
    ],
  },
  {
    name: 'North Central Province',
    slug: 'north-central-province',
    cue: 'Ancient capitals',
    color: '#f59e0b',
    image: 'https://blog.bhlankatours.com/wp-content/uploads/2024/08/Explore-the-Cultural-Heritage-Historical-Tours-in-Sri-Lanka.jpg',
    popularPlaces: ['Anuradhapura', 'Polonnaruwa', 'Minneriya National Park'],
    districts: [
      { name: 'Anuradhapura', famousLocations: ['Sri Maha Bodhi', 'Ruwanwelisaya', 'Mihintale'] },
      { name: 'Polonnaruwa', famousLocations: ['Ancient City of Polonnaruwa', 'Gal Vihara', 'Minneriya National Park'] },
    ],
  },
  {
    name: 'North Western Province',
    slug: 'north-western-province',
    cue: 'Wild coast',
    color: '#65a30d',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=80',
    popularPlaces: ['Wilpattu National Park', 'Kalpitiya', 'Kurunegala'],
    districts: [
      { name: 'Kurunegala', famousLocations: ['Ethagala Rock', 'Ridi Viharaya', 'Yapahuwa Rock Fortress'] },
      { name: 'Puttalam', famousLocations: ['Kalpitiya Lagoon', 'Wilpattu National Park', 'Munneswaram Temple'] },
    ],
  },
  {
    name: 'Eastern Province',
    slug: 'eastern-province',
    cue: 'Surf and lagoons',
    color: '#0ea5e9',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    popularPlaces: ['Trincomalee', 'Arugam Bay', 'Pasikudah'],
    districts: [
      { name: 'Trincomalee', famousLocations: ['Nilaveli Beach', 'Koneswaram Temple', 'Pigeon Island'] },
      { name: 'Batticaloa', famousLocations: ['Batticaloa Lagoon', 'Pasikudah Beach', 'Batticaloa Fort'] },
      { name: 'Ampara', famousLocations: ['Arugam Bay', 'Lahugala National Park', 'Muhudu Maha Viharaya'] },
    ],
  },
  {
    name: 'Central Province',
    slug: 'central-province',
    cue: 'Tea country',
    color: '#059669',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=900&q=80',
    popularPlaces: ['Kandy', 'Sigiriya', 'Nuwara Eliya'],
    districts: [
      { name: 'Kandy', famousLocations: ['Temple of the Sacred Tooth Relic', 'Peradeniya Botanical Garden', 'Udawattakele Sanctuary'] },
      { name: 'Matale', famousLocations: ['Aluvihare Rock Temple', 'Knuckles Mountain Range', 'Nalanda Gedige'] },
      { name: 'Nuwara Eliya', famousLocations: ['Horton Plains', 'Gregory Lake', 'Pedro Tea Estate'] },
    ],
  },
  {
    name: 'Western Province',
    slug: 'western-province',
    cue: 'Capital coast',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80',
    popularPlaces: ['Colombo', 'Negombo', 'Kalutara'],
    districts: [
      { name: 'Colombo', famousLocations: ['Galle Face Green', 'Gangaramaya Temple', 'Colombo Fort'] },
      { name: 'Gampaha', famousLocations: ['Negombo Beach', 'Muthurajawela Wetlands', 'Kelaniya Raja Maha Vihara'] },
      { name: 'Kalutara', famousLocations: ['Kalutara Bodhiya', 'Richmond Castle', 'Brief Garden'] },
    ],
  },
  {
    name: 'Sabaragamuwa Province',
    slug: 'sabaragamuwa-province',
    cue: 'Rainforest trails',
    color: '#0d9488',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=80',
    popularPlaces: ['Ratnapura', 'Sinharaja', 'Kegalle'],
    districts: [
      { name: 'Ratnapura', famousLocations: ['Adam’s Peak', 'Sinharaja Forest Reserve', 'Bopath Ella Falls'] },
      { name: 'Kegalle', famousLocations: ['Pinnawala Elephant Orphanage', 'Kitulgala', 'Belilena Cave'] },
    ],
  },
  {
    name: 'Uva Province',
    slug: 'uva-province',
    cue: 'Mountain valleys',
    color: '#6366f1',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=900&q=80',
    popularPlaces: ['Ella', 'Badulla', 'Haputale'],
    districts: [
      { name: 'Badulla', famousLocations: ['Nine Arch Bridge', 'Dunhinda Falls', 'Muthiyangana Raja Maha Vihara'] },
      { name: 'Monaragala', famousLocations: ['Yudaganawa', 'Maligawila Buddha Statue', 'Gal Oya National Park'] },
    ],
  },
  {
    name: 'Southern Province',
    slug: 'southern-province',
    cue: 'Forts and beaches',
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=900&q=80',
    popularPlaces: ['Galle', 'Mirissa', 'Yala National Park'],
    districts: [
      { name: 'Galle', famousLocations: ['Galle Fort', 'Unawatuna Beach', 'Hikkaduwa Coral Sanctuary'] },
      { name: 'Matara', famousLocations: ['Mirissa Beach', 'Dondra Head Lighthouse', 'Weherahena Temple'] },
      { name: 'Hambantota', famousLocations: ['Yala National Park', 'Bundala National Park', 'Tangalle Beach'] },
    ],
  },
];

export const provinces: Province[] = rawProvinces.map((province) => ({
  ...province,
  districts: province.districts.map((district) => ({
    ...district,
    famousLocations: district.famousLocations.map((location) =>
      normalizeFamousLocation(location, province, district.name)
    ),
  })),
}));

export function getProvinceBySlug(slug: string) {
  return provinces.find((province) => province.slug === slug);
}
