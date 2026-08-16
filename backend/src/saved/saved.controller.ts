import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SavedService } from './saved.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Get()
  async getUserSaved(@Request() req: any) {
    return this.savedService.getUserSaved(req.user.id);
  }

  @Post('toggle')
  async toggleSaved(@Request() req: any, @Body() dto: { itemType: string; itemId: string }) {
    return this.savedService.toggleSaved(req.user.id, dto.itemType, dto.itemId);
  }
}
