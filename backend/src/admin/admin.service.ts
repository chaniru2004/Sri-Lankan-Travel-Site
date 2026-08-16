import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const [
      destinationsCount,
      attractionsCount,
      experiencesCount,
      eventsCount,
      storiesCount,
      accommodationsCount,
      usersCount,
      itinerariesCount,
    ] = await Promise.all([
      this.prisma.destination.count(),
      this.prisma.attraction.count(),
      this.prisma.experience.count(),
      this.prisma.event.count(),
      this.prisma.story.count(),
      this.prisma.accommodation.count(),
      this.prisma.user.count(),
      this.prisma.itinerary.count(),
    ]);

    const recentDestinations = await this.prisma.destination.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return {
      destinationsCount,
      attractionsCount,
      experiencesCount,
      eventsCount,
      storiesCount,
      accommodationsCount,
      usersCount,
      itinerariesCount,
      recentDestinations,
    };
  }
}
