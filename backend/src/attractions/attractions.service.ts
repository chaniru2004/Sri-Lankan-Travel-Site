import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttractionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { category?: string; destinationId?: string; search?: string; limit?: number }) {
    const where: any = { status: 'PUBLISHED' };
    if (query.destinationId) where.destinationId = query.destinationId;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.attraction.findMany({
      where,
      take: query.limit ? Number(query.limit) : undefined,
      include: { destination: true, category: true },
    });
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.attraction.findUnique({
      where: { slug },
      include: { destination: true, category: true },
    });
    if (!item) throw new NotFoundException(`Attraction ${slug} not found`);
    return item;
  }
}
