import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsRepository } from './teams.repository';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async create(partialData: Partial<Team>): Promise<Team> {
    const team = await this.teamsRepository.create(partialData);
    return team;
  }

  async findAll() {
    return this.teamsRepository.findAll();
  }

  async findOne(id: number) {
    const team = await this.teamsRepository.findOne(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const updated = await this.teamsRepository.update(id, updateTeamDto);
    if (!updated) {
      throw new NotFoundException('Team not found');
    }
    return updated;
  }

  async remove(id: number) {
    const result = await this.teamsRepository.remove(id);
    if (!result) {
      throw new NotFoundException('Team not found');
    }
    return { message: 'Team deleted successfully' };
  }
}
