import { getPostgresConfig } from './postgres.module'

const config = {}

export = getPostgresConfig({ get: (key: string) => config[key] } as any)
