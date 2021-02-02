export const configure = () => ({
  postgres: {
    host: process.env.PG_DB_HOST,
    port: Number(process.env.PG_DB_PORT),
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    name: process.env.PG_DB_NAME,
  },
})
