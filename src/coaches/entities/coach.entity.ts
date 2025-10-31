import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';

@Entity('coaches')
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nationality: string;

  @Column()
  experienceYears: number;

  @OneToOne(() => Team, (team) => team.coach)
  @JoinColumn()
  team: Team;
}
