import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DestinationsModule } from './destinations/destinations.module';
import { AttractionsModule } from './attractions/attractions.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { EventsModule } from './events/events.module';
import { StoriesModule } from './stories/stories.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { SavedModule } from './saved/saved.module';
import { SearchModule } from './search/search.module';
import { AdminModule } from './admin/admin.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    DestinationsModule,
    AttractionsModule,
    ExperiencesModule,
    EventsModule,
    StoriesModule,
    AccommodationModule,
    ItinerariesModule,
    SavedModule,
    SearchModule,
    AdminModule,
    MediaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
