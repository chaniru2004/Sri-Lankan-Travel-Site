import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItinerariesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.itinerary.findMany({
      where: { status: 'PUBLISHED', isPublic: true },
      include: {
        days: {
          include: {
            destination: true,
            items: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.itinerary.findUnique({
      where: { slug },
      include: {
        days: {
          orderBy: { dayNumber: 'asc' },
          include: {
            destination: true,
            items: { orderBy: { orderIndex: 'asc' } },
          },
        },
      },
    });
    if (!item) throw new NotFoundException(`Itinerary ${slug} not found`);
    return item;
  }

  async generateItinerary(dto: {
    durationDays: number;
    travelPace: string;
    travelStyle: string;
    travelGroup: string;
    interests: string[];
  }) {
    const daysCount = dto.durationDays || 7;
    const destinations = await this.prisma.destination.findMany({
      take: 6,
      include: { attractions: { take: 3 }, experiences: { take: 2 } },
    });

    const generatedDays = [];
    for (let dayNum = 1; dayNum <= daysCount; dayNum++) {
      const dest = destinations[(dayNum - 1) % destinations.length];
      generatedDays.push({
        dayNumber: dayNum,
        title: `Day ${dayNum}: Exploring ${dest.name}`,
        description: `Immerse yourself in ${dest.name}'s top highlights, cultural heritage, and natural beauty.`,
        destination: dest,
        items: [
          {
            title: dest.attractions[0]?.name || `Morning highlight in ${dest.name}`,
            itemType: 'ATTRACTION',
            activityTime: 'Morning',
            estimatedCost: dto.travelStyle === 'Luxury' ? '$50' : '$15',
            notes: 'Recommended arrival at 8:30 AM',
          },
          {
            title: dest.experiences[0]?.name || `Cultural experience in ${dest.name}`,
            itemType: 'EXPERIENCE',
            activityTime: 'Afternoon',
            estimatedCost: dto.travelStyle === 'Luxury' ? '$80' : '$25',
            notes: 'Guided local tour',
          },
          {
            title: `Traditional Ceylon Curry Dinner at ${dest.name}`,
            itemType: 'FOOD',
            activityTime: 'Evening',
            estimatedCost: '$20',
            notes: 'Authentic local dining spot',
          },
        ],
      });
    }

    return {
      title: `${daysCount}-Day Customized Sri Lanka ${dto.interests.join(' & ')} Journey`,
      durationDays: daysCount,
      pace: dto.travelPace || 'Balanced',
      style: dto.travelStyle || 'Comfort',
      targetAudience: dto.travelGroup || 'Couple',
      days: generatedDays,
    };
  }
}
