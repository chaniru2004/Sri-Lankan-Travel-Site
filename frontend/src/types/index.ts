export interface Destination {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  region: string;
  province: string;
  district: string;
  latitude: number;
  longitude: number;
  heroImage: string;
  gallery: string[];
  videoUrl?: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  averageTemperature: string;
  gettingThere: string;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  seoTitle?: string;
  seoDescription?: string;
  attractions?: Attraction[];
  experiences?: Experience[];
  events?: Event[];
  accommodations?: Accommodation[];
}

export interface Attraction {
  id: string;
  name: string;
  slug: string;
  destinationId: string;
  destination?: Destination;
  categoryId?: string;
  category?: Category;
  description: string;
  latitude: number;
  longitude: number;
  heroImage: string;
  gallery: string[];
  openingHours?: string;
  recommendedDuration?: string;
  bestTime?: string;
  entryInformation?: string;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface Experience {
  id: string;
  name: string;
  slug: string;
  categoryId?: string;
  category?: Category;
  destinationId: string;
  destination?: Destination;
  description: string;
  duration: string;
  difficulty?: string;
  bestSeason: string;
  heroImage: string;
  gallery: string[];
  latitude: number;
  longitude: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  destinationId: string;
  destination?: Destination;
  venue: string;
  latitude: number;
  longitude: number;
  heroImage: string;
  category: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  heroImage: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
}

export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  destinationId: string;
  destination?: Destination;
  type: string;
  priceRange: string;
  rating: number;
  heroImage: string;
  address: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  bookingUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'ATTRACTION' | 'EXPERIENCE' | 'EVENT' | 'STORY' | 'ACCOMMODATION';
  icon?: string;
  description?: string;
}

export interface ItineraryItem {
  id?: string;
  title: string;
  itemType: string;
  activityTime?: string;
  estimatedCost?: string;
  notes?: string;
  orderIndex?: number;
}

export interface ItineraryDay {
  id?: string;
  dayNumber: number;
  title: string;
  description: string;
  destination?: Destination;
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  title: string;
  slug: string;
  description: string;
  durationDays: number;
  pace: string;
  style: string;
  targetAudience: string;
  heroImage: string;
  days: ItineraryDay[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'EDITOR' | 'ADMIN' | 'SUPER_ADMIN';
  avatar?: string;
}
