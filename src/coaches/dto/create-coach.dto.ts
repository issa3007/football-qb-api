import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoachDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsInt()
  experienceYears: number;

  @IsInt()
  teamId: number;
}
