import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesRepository {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepo: Repository<Match>,
  ) {}

  async create(partialData: Partial<Match>) {
    const match = this.matchesRepo.create(partialData);
    return this.matchesRepo.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchesRepo
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.homeTeam', 'homeTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .orderBy('match.date', 'DESC')
      .getMany();
  }

  async findOne(id: number): Promise<Match | null> {
    return this.matchesRepo
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.homeTeam', 'homeTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .where('match.id = :id', { id })
      .getOne();
  }

  async findRecent(limit = 5): Promise<any[]> {
    return this.matchesRepo
      .createQueryBuilder('match')
      .leftJoin('match.homeTeam', 'home')
      .leftJoin('match.awayTeam', 'away')
      .select([
        'match.id AS id',
        'home.name AS homeTeam',
        'away.name AS awayTeam',
        'match.scoreHome AS homeScore',
        'match.scoreAway AS awayScore',
        'match.date AS date',
      ])
      .orderBy('match.date', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async update(id: number, partialData: Partial<Match>): Promise<Match | null> {
    const match = await this.matchesRepo.findOne({ where: { id } });
    if (!match) return null;
    Object.assign(match, partialData);
    return this.matchesRepo.save(match);
  }

  async remove(id: number) {
    const match = await this.matchesRepo.findOne({ where: { id } });
    if (!match) return false;
    await this.matchesRepo.remove(match);
    return true;
  }
}
