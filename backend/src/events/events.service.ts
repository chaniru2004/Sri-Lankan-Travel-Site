import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      where: { status: 'PUBLISHED' },
      include: { destination: true },
      orderBy: { startDate: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.event.findUnique({
      where: { slug },
      include: { destination: true },
    });
    if (!item) throw new NotFoundException(`Event ${slug} not found`);
    return item;
  }
}
