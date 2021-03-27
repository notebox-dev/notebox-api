import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from 'src/app.module'
import { setupSwagger } from 'src/lib/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  setupSwagger(app)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())
  app.disable('x-powered-by')
  app.setGlobalPrefix('/api/v1')

  await app.listen(3000)
}

bootstrap()
