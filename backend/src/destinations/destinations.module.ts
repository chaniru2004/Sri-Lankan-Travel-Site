import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';

@Module({
  providers: [DestinationsService],
  controllers: [DestinationsController],
  exports: [DestinationsService],
})
export class DestinationsModule {}
