import { IsNotEmpty, IsUUID } from 'class-validator'

export class RefreshDto {
  @IsUUID('4')
  @IsNotEmpty()
  refreshToken: string
}
