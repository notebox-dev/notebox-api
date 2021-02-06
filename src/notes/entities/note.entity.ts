/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  content: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date
}
