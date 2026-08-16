import { Module } from '@nestjs/common';
import { AttractionsService } from './attractions.service';
import { AttractionsController } from './attractions.controller';

@Module({
  providers: [AttractionsService],
  controllers: [AttractionsController],
  exports: [AttractionsService],
})
export class AttractionsModule {}
