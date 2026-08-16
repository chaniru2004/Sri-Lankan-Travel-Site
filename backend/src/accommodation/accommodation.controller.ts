import { Controller, Get, Param, Query } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { Public } from '../auth/public.decorator';

@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Public()
  @Get()
  async findAll(@Query('type') type?: string, @Query('destinationId') destinationId?: string) {
    return this.accommodationService.findAll({ type, destinationId });
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.accommodationService.findBySlug(slug);
  }
}
