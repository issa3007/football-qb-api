import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player and assign to a team' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all players with their teams' })
  findAll() {
    return this.playersService.findAllPlayers();
  }

  @Get('top-by-country')
  @ApiOperation({
    summary: 'Top goal-scoring countries (aggregated players goals)',
  })
  findTopScorersByCountry(@Query('limit') limit?: number) {
    return this.playersService.findTopScorersByCountry(limit ? +limit : 5);
  }

  @Get('veterans')
  @ApiOperation({ summary: 'Get players older than given age (default: 30)' })
  findVeterans(@Query('minAge') minAge?: number) {
    return this.playersService.findVeteranPlayers(minAge ? minAge : 30);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get player by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.findOnePlayer(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update player by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete player by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.removePlayer(id);
  }
}
