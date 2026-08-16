import { Controller, Get, Param, Query } from '@nestjs/common';
import { AttractionsService } from './attractions.service';
import { Public } from '../auth/public.decorator';

@Controller('attractions')
export class AttractionsController {
  constructor(private readonly attractionsService: AttractionsService) {}

  @Public()
  @Get()
  async findAll(@Query('destinationId') destinationId?: string, @Query('search') search?: string) {
    return this.attractionsService.findAll({ destinationId, search });
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.attractionsService.findBySlug(slug);
  }
}
