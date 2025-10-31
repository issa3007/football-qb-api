import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { Match } from 'src/matches/entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesRepository } from 'src/matches/matches.repository';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), TeamsModule],
  controllers: [MatchesController],
  providers: [MatchesService, MatchesRepository],
})
export class MatchesModule {}
