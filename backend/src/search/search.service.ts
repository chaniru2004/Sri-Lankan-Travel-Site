import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(q: string) {
    if (!q || q.trim().length === 0) {
      return { destinations: [], attractions: [], experiences: [], events: [], stories: [], itineraries: [] };
    }
    const queryStr = q.trim();

    const [destinations, attractions, experiences, events, stories, itineraries] = await Promise.all([
      this.prisma.destination.findMany({
        where: { name: { contains: queryStr, mode: 'insensitive' } },
        take: 5,
      }),
      this.prisma.attraction.findMany({
        where: { name: { contains: queryStr, mode: 'insensitive' } },
        take: 5,
      }),
      this.prisma.experience.findMany({
        where: { name: { contains: queryStr, mode: 'insensitive' } },
        take: 5,
      }),
      this.prisma.event.findMany({
        where: { title: { contains: queryStr, mode: 'insensitive' } },
        take: 5,
      }),
      this.prisma.story.findMany({
        where: { title: { contains: queryStr, mode: 'insensitive' } },
        take: 5,
      }),
      this.prisma.itinerary.findMany({
        where: { title: { contains: queryStr, mode: 'insensitive' } },
        take: 5,
      }),
    ]);

    return {
      destinations,
      attractions,
      experiences,
      events,
      stories,
      itineraries,
    };
  }
}
