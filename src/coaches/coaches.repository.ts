import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coach } from './entities/coach.entity';

@Injectable()
export class CoachesRepository {
  constructor(
    @InjectRepository(Coach)
    private readonly coachesRepo: Repository<Coach>,
  ) {}

  async create(partialData: Partial<Coach>) {
    const coach = this.coachesRepo.create(partialData);
    return this.coachesRepo.save(coach);
  }

  async findAll(): Promise<Coach[]> {
    return this.coachesRepo
      .createQueryBuilder('coach')
      .leftJoinAndSelect('coach.team', 'team')
      .orderBy('coach.name', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Coach | null> {
    return this.coachesRepo
      .createQueryBuilder('coach')
      .leftJoinAndSelect('coach.team', 'team')
      .where('coach.id = :id', { id })
      .getOne();
  }

  async findCoachesWithAvgPlayerAge(): Promise<any[]> {
    return this.coachesRepo
      .createQueryBuilder('coach')
      .leftJoin('coach.team', 'team')
      .leftJoin('team.players', 'players')
      .select('coach.name', 'coachName')
      .addSelect('team.name', 'teamName')
      .addSelect('AVG(players.age)', 'avgPlayerAge')
      .groupBy('coach.id')
      .addGroupBy('team.name')
      .orderBy('avgPlayerAge', 'DESC')
      .getRawMany();
  }

  async findExperiencedCoaches(minYears = 5): Promise<Coach[]> {
    return this.coachesRepo
      .createQueryBuilder('coach')
      .leftJoinAndSelect('coach.team', 'team')
      .where('coach.experienceYears >= :minYears', { minYears })
      .orderBy('coach.experienceYears', 'DESC')
      .addOrderBy('team.name', 'ASC')
      .getMany();
  }

  async update(id: number, data: Partial<Coach>): Promise<Coach | null> {
    const coach = await this.coachesRepo.findOne({ where: { id } });
    if (!coach) return null;
    Object.assign(coach, data);
    return this.coachesRepo.save(coach);
  }

  async remove(id: number) {
    const coach = await this.coachesRepo.findOne({ where: { id } });
    if (!coach) return false;
    await this.coachesRepo.remove(coach);
    return true;
  }
}
