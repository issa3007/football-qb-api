import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchesRepository } from './matches.repository';
import { TeamsRepository } from 'src/teams/teams.repository';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    private readonly matchesRepo: MatchesRepository,
    private readonly teamsRepo: TeamsRepository,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto) {
    const homeTeam = await this.teamsRepo.findOne(createMatchDto.homeTeamId);
    const awayTeam = await this.teamsRepo.findOne(createMatchDto.awayTeamId);

    if (!homeTeam || !awayTeam)
      throw new NotFoundException('One or both teams not found');

    return this.matchesRepo.create({
      homeTeam,
      awayTeam,
      date: createMatchDto.date,
      scoreHome: createMatchDto.scoreHome,
      scoreAway: createMatchDto.scoreAway,
    });
  }

  async findAllMatches() {
    return this.matchesRepo.findAll();
  }

  async findOneMatch(id: number) {
    const match = await this.matchesRepo.findOne(id);
    if (!match) throw new NotFoundException('Match not found');
    return match;
  }

  async findRecent(limit = 5) {
    return this.matchesRepo.findRecent(limit);
  }

  async updateMatch(id: number, updateMatchDto: UpdateMatchDto) {
    const updated = await this.matchesRepo.update(id, updateMatchDto);
    if (!updated) throw new NotFoundException('Match not found');
    return updated;
  }

  async removeMatch(id: number) {
    const result = await this.matchesRepo.remove(id);
    if (!result) throw new NotFoundException('Match not found');
    return { message: 'Match deleted successfully' };
  }
}
