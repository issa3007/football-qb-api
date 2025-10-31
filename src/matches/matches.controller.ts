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
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new match' })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.createMatch(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all matches with both teams' })
  findAll() {
    return this.matchesService.findAllMatches();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent matches with scores (default: 5)' })
  findRecent(@Query('limit') limit?: number) {
    return this.matchesService.findRecent(limit ? limit : 5);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get match by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.findOneMatch(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update match by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchesService.updateMatch(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete match by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchesService.removeMatch(id);
  }
}
