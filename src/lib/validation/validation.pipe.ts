import {
  BadRequestException,
  ValidationError,
  ValidationPipe as BaseValidationPipe,
} from '@nestjs/common'

export class ValidationPipe extends BaseValidationPipe {
  createExceptionFactory() {
    return (errors: ValidationError[]) => {
      errors = errors.map((error) => ({
        property: error.property,
        checks: Object.entries(error.constraints).map(([constraint, message]) => ({
          kind: constraint,
          message,
        })),
      }))
      return new BadRequestException({ type: 'ValidationError', errors })
    }
  }
}
