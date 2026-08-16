const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function fetcher(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'API request failed');
    }
    return res.json();
  } catch (error) {
    console.warn(`API call ${endpoint} fallback:`, error);
    throw error;
  }
}

export const api = {
  // Destinations
  getDestinations: (params?: { region?: string; province?: string; search?: string; featured?: string; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.region) searchParams.append('region', params.region);
    if (params?.province) searchParams.append('province', params.province);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.featured) searchParams.append('featured', params.featured);
    if (params?.limit) searchParams.append('limit', String(params.limit));
    return fetcher(`/destinations?${searchParams.toString()}`);
  },

  getDestinationBySlug: (slug: string) => fetcher(`/destinations/${slug}`),

  // Attractions
  getAttractions: (params?: { destinationId?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.destinationId) searchParams.append('destinationId', params.destinationId);
    if (params?.search) searchParams.append('search', params.search);
    return fetcher(`/attractions?${searchParams.toString()}`);
  },

  // Experiences
  getExperiences: (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    return fetcher(`/experiences?${searchParams.toString()}`);
  },

  // Events
  getEvents: () => fetcher('/events'),
  getEventBySlug: (slug: string) => fetcher(`/events/${slug}`),

  // Stories
  getStories: () => fetcher('/stories'),
  getStoryBySlug: (slug: string) => fetcher(`/stories/${slug}`),

  // Accommodations
  getAccommodations: (params?: { type?: string; destinationId?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.append('type', params.type);
    if (params?.destinationId) searchParams.append('destinationId', params.destinationId);
    return fetcher(`/accommodation?${searchParams.toString()}`);
  },

  // Itineraries
  getItineraries: () => fetcher('/itineraries'),
  getItineraryBySlug: (slug: string) => fetcher(`/itineraries/${slug}`),
  generateItinerary: (dto: any) => fetcher('/itineraries/generate', { method: 'POST', body: JSON.stringify(dto) }),

  // Search
  globalSearch: (q: string) => fetcher(`/search?q=${encodeURIComponent(q)}`),

  // Saved
  getSaved: () => fetcher('/saved'),
  toggleSave: (itemType: string, itemId: string) => fetcher('/saved/toggle', { method: 'POST', body: JSON.stringify({ itemType, itemId }) }),

  // Auth
  login: (dto: any) => fetcher('/auth/login', { method: 'POST', body: JSON.stringify(dto) }),
  register: (dto: any) => fetcher('/auth/register', { method: 'POST', body: JSON.stringify(dto) }),
  getProfile: () => fetcher('/auth/profile'),

  // Admin CMS
  getAdminMetrics: () => fetcher('/admin/metrics'),
};
