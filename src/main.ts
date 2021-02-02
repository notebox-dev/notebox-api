import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = new DocumentBuilder()
    .addServer('/api/v1')
    .setTitle('Notebox API')
    .setVersion('v1')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/api/v1', app, document)

  app.disable('x-powered-by')
  app.setGlobalPrefix('/api/v1')
  app.listen(3000)
}

bootstrap()
