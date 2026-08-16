import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccommodationService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { type?: string; destinationId?: string }) {
    const where: any = { status: 'PUBLISHED' };
    if (query.type) where.type = query.type;
    if (query.destinationId) where.destinationId = query.destinationId;
    return this.prisma.accommodation.findMany({
      where,
      include: { destination: true },
    });
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.accommodation.findUnique({
      where: { slug },
      include: { destination: true },
    });
    if (!item) throw new NotFoundException(`Accommodation ${slug} not found`);
    return item;
  }
}
