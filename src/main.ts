import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  // prettier-ignore
  (await NestFactory.create(AppModule))
    .setGlobalPrefix('/api/v1')
    .listen(3000)
}
bootstrap()
