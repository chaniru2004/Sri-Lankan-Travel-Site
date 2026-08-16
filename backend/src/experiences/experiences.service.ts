import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { category?: string; search?: string; limit?: number }) {
    const where: any = { status: 'PUBLISHED' };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.experience.findMany({
      where,
      take: query.limit ? Number(query.limit) : undefined,
      include: { destination: true, category: true },
    });
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.experience.findUnique({
      where: { slug },
      include: { destination: true, category: true },
    });
    if (!item) throw new NotFoundException(`Experience ${slug} not found`);
    return item;
  }
}
