import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Coach } from 'src/coaches/entities/coach.entity';
import { Match } from 'src/matches/entities/match.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  foundationYear: number;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToOne(() => Coach, (coach) => coach.team)
  coach: Coach;

  @OneToMany(() => Match, (match) => match.homeTeam)
  homeMatches: Match[];

  @OneToMany(() => Match, (match) => match.awayTeam)
  awayMatches: Match[];
}
