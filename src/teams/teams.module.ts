import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from 'src/teams/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsRepository } from 'src/teams/teams.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
})
export class TeamsModule {}
