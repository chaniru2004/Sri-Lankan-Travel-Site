import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';

@Module({
  providers: [AccommodationService],
  controllers: [AccommodationController],
  exports: [AccommodationService],
})
export class AccommodationModule {}
