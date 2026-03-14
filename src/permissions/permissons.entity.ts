import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permisson')
export class Permisson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
