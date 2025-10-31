import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersRepository } from './players.repository';
import { TeamsRepository } from 'src/teams/teams.repository';

@Injectable()
export class PlayersService {
  constructor(
    private readonly playersRepo: PlayersRepository,
    private readonly teamsRepo: TeamsRepository,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    const team = await this.teamsRepo.findOne(createPlayerDto.teamId);
    if (!team) throw new NotFoundException('Team not found');

    return this.playersRepo.create({ ...createPlayerDto, team });
  }

  async findAllPlayers() {
    return this.playersRepo.findAll();
  }

  async findOnePlayer(id: number) {
    const player = await this.playersRepo.findOne(id);
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async findTopScorersByCountry(limit = 5) {
    return this.playersRepo.findTopScorersByCountry(limit);
  }

  async findVeteranPlayers(minAge = 30) {
    return this.playersRepo.findVeteranPlayers(minAge);
  }

  async updatePlayer(id: number, updatePlayerDto: UpdatePlayerDto) {
    const updated = await this.playersRepo.update(id, updatePlayerDto);
    if (!updated) throw new NotFoundException('Player not found');
    return updated;
  }

  async removePlayer(id: number) {
    const result = await this.playersRepo.remove(id);
    if (!result) throw new NotFoundException('Player not found');
    return { message: 'Player deleted successfully' };
  }
}
