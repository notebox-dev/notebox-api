import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class RefreshSession {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string

  @Column({ type: 'varchar' })
  ip: string

  @Column({ type: 'text', name: 'user_agent' })
  userAgent: string

  @Column({ type: 'bigint', name: 'expires_in' })
  expiresIn: number

  // @Column({ type: 'text' })
  // fingerprint: string
}
