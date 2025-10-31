import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Team } from './entities/team.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  create(@Body() partialData: Partial<Team>) {
    return this.teamsService.createTeam(partialData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams with players and coach' })
  findAll() {
    return this.teamsService.findAllTeams();
  }

  @Get('country/:country')
  @ApiOperation({ summary: 'Find all teams from a specific country' })
  findByCountry(@Param('country') country: string) {
    return this.teamsService.findByCountry(country);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one team by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOneTeam(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update team by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.updateTeam(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete team by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.removeTeam(id);
  }
}
