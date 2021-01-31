import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Notebox API')
    .setVersion('v1')
    .setBasePath('/api/v1')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/api/v1', app, document)
  app.setGlobalPrefix('/api/v1').listen(3000)
}

bootstrap()
