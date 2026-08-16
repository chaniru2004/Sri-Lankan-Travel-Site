import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.story.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.story.findUnique({
      where: { slug },
    });
    if (!item) throw new NotFoundException(`Story ${slug} not found`);
    return item;
  }
}
