import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersRepository {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepo: Repository<Player>,
  ) {}

  async create(data: Partial<Player>) {
    const player = this.playersRepo.create(data);
    return this.playersRepo.save(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playersRepo
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.team', 'team')
      .orderBy('player.name', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Player | null> {
    return this.playersRepo
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.team', 'team')
      .where('player.id = :id', { id })
      .getOne();
  }

  async findTopScorersByCountry(limit = 5): Promise<any[]> {
    return this.playersRepo
      .createQueryBuilder('player')
      .select('player.nationality', 'country')
      .addSelect('SUM(player.goals)', 'totalGoals')
      .groupBy('player.nationality')
      .orderBy('totalGoals', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async findVeteranPlayers(minAge = 30): Promise<Player[]> {
    return this.playersRepo
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.team', 'team')
      .where('player.age >= :minAge', { minAge })
      .orderBy('player.goals', 'DESC')
      .getMany();
  }

  async update(id: number, data: Partial<Player>): Promise<Player | null> {
    const player = await this.playersRepo.findOne({ where: { id } });
    if (!player) return null;
    Object.assign(player, data);
    return this.playersRepo.save(player);
  }

  async remove(id: number) {
    const player = await this.playersRepo.findOne({ where: { id } });
    if (!player) return false;
    await this.playersRepo.remove(player);
    return true;
  }
}
