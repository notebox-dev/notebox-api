import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', name: 'user_id' })
  @Index()
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
