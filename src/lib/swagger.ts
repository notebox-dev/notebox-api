import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .addServer('/api/v1')
    .setTitle('Notebox API')
    .setVersion('v1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/v1', app, document)
}
