import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Public } from '../auth/public.decorator';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }
}
