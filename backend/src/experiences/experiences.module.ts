import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';

@Module({
  providers: [ExperiencesService],
  controllers: [ExperiencesController],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
