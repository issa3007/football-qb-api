import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { UpdateTeamDto } from './dto/update-team.dto';

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

  async findAll() {
    return this.teamsRepo
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('team.coach', 'coach')
      .orderBy('team.name', 'ASC')
      .getMany();
  }

  async findOne(id: number) {
    return this.teamsRepo
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('team.coach', 'coach')
      .where('team.id = :id', { id })
      .getOne();
  }

  async findByCountry(country: string): Promise<Team[]> {
    return this.teamsRepo
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('team.coach', 'coach')
      .where('team.country = :country', { country })
      .orderBy('team.name', 'ASC')
      .getMany();
  }

  async update(id: number, data: UpdateTeamDto) {
    const team = await this.teamsRepo.findOne({ where: { id } });
    if (!team) return null;
    Object.assign(team, data);
    return this.teamsRepo.save(team);
  }

  async remove(id: number) {
    const team = await this.teamsRepo.findOne({ where: { id } });
    if (!team) return false;
    await this.teamsRepo.remove(team);
    return true;
  }
}
