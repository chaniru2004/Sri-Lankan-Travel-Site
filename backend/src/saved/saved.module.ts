import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';

@Module({
  providers: [SavedService],
  controllers: [SavedController],
  exports: [SavedService],
})
export class SavedModule {}
