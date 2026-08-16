import { Controller, Get, Param } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { Public } from '../auth/public.decorator';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Public()
  @Get()
  async findAll() {
    return this.storiesService.findAll();
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.storiesService.findBySlug(slug);
  }
}
