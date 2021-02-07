export const configure = () => ({
  access_token: {
    expires_in: '2m',
    secret_key: '3bcd7273-58e1-4fd6-86b1-be590938630a',
  },
  refresh_token: {
    expires_in: '60d',
  },
  encryption: {
    salt_rounds: 10,
  },
  postgres: {
    host: process.env.PG_DB_HOST,
    port: Number(process.env.PG_DB_PORT),
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    name: process.env.PG_DB_NAME,
  },
})
