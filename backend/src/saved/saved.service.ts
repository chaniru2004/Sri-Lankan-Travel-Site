import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedService {
  constructor(private prisma: PrismaService) {}

  async getUserSaved(userId: string) {
    return this.prisma.savedItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async toggleSaved(userId: string, itemType: string, itemId: string) {
    const existing = await this.prisma.savedItem.findFirst({
      where: { userId, itemType, itemId },
    });
    if (existing) {
      await this.prisma.savedItem.delete({ where: { id: existing.id } });
      return { saved: false };
    } else {
      await this.prisma.savedItem.create({
        data: { userId, itemType, itemId },
      });
      return { saved: true };
    }
  }
}
