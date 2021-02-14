import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type User = { id: string }

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest()

    return request.user
  },
)
