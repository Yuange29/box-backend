import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categpry')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column({ unique: true })
  @IsString()
  @MinLength(2, { message: 'too few character' })
  @IsNotEmpty()
  categoryName: string;

  @Column()
  @IsOptional()
  categoryDescription: string;

  @Column()
  userId: string;
}
