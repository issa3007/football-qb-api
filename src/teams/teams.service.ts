import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepo: TeamsRepository) {}

  async createTeam(data: Partial<Team>) {
    return this.teamsRepo.create(data);
  }

  async findAllTeams() {
    return this.teamsRepo.findAll();
  }

  async findOneTeam(id: number) {
    const team = await this.teamsRepo.findOne(id);
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async findByCountry(country: string) {
    return this.teamsRepo.findByCountry(country);
  }


  async updateTeam(id: number, dto: UpdateTeamDto) {
    const updated = await this.teamsRepo.update(id, dto);
    if (!updated) throw new NotFoundException('Team not found');
    return updated;
  }

  async removeTeam(id: number) {
    const removed = await this.teamsRepo.remove(id);
    if (!removed) throw new NotFoundException('Team not found');
    return { message: 'Team deleted successfully' };
  }
}
