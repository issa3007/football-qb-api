import { Injectable } from '@nestjs/common';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepo: Repository<Team>,
  ) {}

  async create(partialData: Partial<Team>) {
    const team = this.teamsRepo.create(partialData);
    return this.teamsRepo.save(team);
  }

  async findAll(): Promise<Team[]> {
    return this.teamsRepo
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('team.coach', 'coach')
      .orderBy('team.name', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Team | null> {
    return this.teamsRepo
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('team.coach', 'coach')
      .where('team.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team | null> {
    const team = await this.teamsRepo.findOne({ where: { id } });
    if (!team) return null;
    Object.assign(team, updateTeamDto);
    return this.teamsRepo.save(team);
  }

  async remove(id: number) {
    const team = await this.teamsRepo.findOne({ where: { id } });
    if (!team) return false;
    return this.teamsRepo.remove(team);
  }
}
