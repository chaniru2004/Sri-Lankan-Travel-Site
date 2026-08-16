import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { Public } from '../auth/public.decorator';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Public()
  @Get()
  async findAll(@Query('category') category?: string, @Query('search') search?: string) {
    return this.experiencesService.findAll({ category, search });
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.experiencesService.findBySlug(slug);
  }
}
