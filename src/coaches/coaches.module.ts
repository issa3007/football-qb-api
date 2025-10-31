import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CoachesController } from './coaches.controller';
import { Coach } from 'src/coaches/entities/coach.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachesRepository } from 'src/coaches/coaches.repository';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coach]), TeamsModule],
  controllers: [CoachesController],
  providers: [CoachesService, CoachesRepository],
})
export class CoachesModule {}
