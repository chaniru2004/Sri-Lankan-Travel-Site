import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { Public } from '../auth/public.decorator';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Public()
  @Get()
  async findAll() {
    return this.itinerariesService.findAll();
  }

  @Public()
  @Post('generate')
  async generateItinerary(@Body() dto: any) {
    return this.itinerariesService.generateItinerary(dto);
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.itinerariesService.findBySlug(slug);
  }
}
