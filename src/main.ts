import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from 'src/app.module'
import { setupSwagger } from 'src/lib/swagger'
import { ValidationPipe, ValidationExceptionFilter } from 'src/lib/validation'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  setupSwagger(app)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new ValidationExceptionFilter())

  app.disable('x-powered-by')
  app.setGlobalPrefix('/api/v1')

  await app.listen(3100)
}

bootstrap()
