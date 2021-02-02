import { resolve } from 'path'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

export function getPostgresConfig(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',

    database: config.get('postgress.name'),
    host: config.get('postgress.host'),
    password: config.get('postgress.password'),
    port: config.get('postgress.port'),
    username: config.get('postgress.username'),

    // TODO: Resolve project root.
    entities: [resolve(__dirname, '../../**/*.entity{.ts,.js}')],

    // TODO: Disable for production.
    synchronize: true,
    migrations: [resolve(__dirname, '../../migrations/**/*{.ts,.js}')],

    cli: {
      migrationsDir: 'src/migrations',
    },
  }
}

export const PostgresModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: getPostgresConfig,
})
