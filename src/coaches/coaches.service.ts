import { Injectable, NotFoundException } from '@nestjs/common';
import { CoachesRepository } from './coaches.repository';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { TeamsRepository } from 'src/teams/teams.repository';

@Injectable()
export class CoachesService {
  constructor(
    private readonly coachesRepo: CoachesRepository,
    private readonly teamsRepo: TeamsRepository,
  ) {}

  async createCoach(createCoachDto: CreateCoachDto) {
    const team = await this.teamsRepo.findOne(createCoachDto.teamId);
    if (!team) throw new NotFoundException('Team not found');
    return this.coachesRepo.create({ ...createCoachDto, team });
  }

  async findAllCoaches() {
    return this.coachesRepo.findAll();
  }

  async findOneCoach(id: number) {
    const coach = await this.coachesRepo.findOne(id);
    if (!coach) throw new NotFoundException('Coach not found');
    return coach;
  }

  async findCoachesWithAvgPlayerAge() {
    return this.coachesRepo.findCoachesWithAvgPlayerAge();
  }

  async findExperiencedCoaches(minYears = 5) {
    return this.coachesRepo.findExperiencedCoaches(minYears);
  }

  async updateCoach(id: number, updateCoachDto: UpdateCoachDto) {
    const updated = await this.coachesRepo.update(id, updateCoachDto);
    if (!updated) throw new NotFoundException('Coach not found');
    return updated;
  }

  async removeCoach(id: number) {
    const result = await this.coachesRepo.remove(id);
    if (!result) throw new NotFoundException('Coach not found');
    return { message: 'Coach deleted successfully' };
  }
}
