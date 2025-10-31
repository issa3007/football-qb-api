import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  homeTeamId: number;

  @IsInt()
  awayTeamId: number;

  @IsDateString()
  date: Date;

  @IsInt()
  scoreHome: number;

  @IsInt()
  scoreAway: number;
}
