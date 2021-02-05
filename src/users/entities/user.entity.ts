import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  email: string

  @Column({ type: 'varchar', nullable: false })
  password: string
}
