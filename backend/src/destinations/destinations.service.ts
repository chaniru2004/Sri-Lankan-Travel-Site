import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { region?: string; province?: string; search?: string; featured?: string; limit?: number }) {
    const where: any = { status: 'PUBLISHED' };
    if (query.region && query.region !== 'All') {
      where.region = query.region;
    }
    if (query.province && query.province !== 'All') {
      where.province = query.province;
    }
    if (query.featured === 'true') {
      where.featured = true;
    }
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { shortDescription: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.destination.findMany({
      where,
      orderBy: { name: 'asc' },
      take: query.limit ? Number(query.limit) : undefined,
      include: {
        attractions: { take: 5 },
        experiences: { take: 5 },
      },
    });
  }

  async findBySlug(slug: string) {
    const destination = await this.prisma.destination.findUnique({
      where: { slug },
      include: {
        attractions: { include: { category: true } },
        experiences: { include: { category: true } },
        events: true,
        accommodations: true,
      },
    });
    if (!destination) {
      throw new NotFoundException(`Destination with slug ${slug} not found`);
    }
    return destination;
  }

  async create(data: any) {
    return this.prisma.destination.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.destination.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.destination.delete({ where: { id } });
  }
}
