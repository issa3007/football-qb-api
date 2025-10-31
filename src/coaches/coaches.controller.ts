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
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('coaches')
@Controller('coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new coach' })
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachesService.createCoach(createCoachDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all coaches with team' })
  findAll() {
    return this.coachesService.findAllCoaches();
  }

  @Get('avg-player-age')
  @ApiOperation({ summary: 'Get coaches with average age of their players' })
  findCoachesWithAvgPlayerAge() {
    return this.coachesService.findCoachesWithAvgPlayerAge();
  }

  @Get('experienced')
  @ApiOperation({
    summary: 'Get coaches with minimum experience default: 5 years',
  })
  findExperienced(@Query('minYears') minYears?: number) {
    return this.coachesService.findExperiencedCoaches(minYears ? minYears : 5);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get coach by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coachesService.findOneCoach(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update coach by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoachDto: UpdateCoachDto,
  ) {
    return this.coachesService.updateCoach(id, updateCoachDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete coach by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coachesService.removeCoach(id);
  }
}
