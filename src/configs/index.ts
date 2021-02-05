export const configure = () => ({
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
