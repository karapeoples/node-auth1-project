// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./api/data/auth.db3",
    },
    migrations: {
      directory: "./api/data/migrations",
    },
    seeds: {
      directory: "./api/data/seeds",
    },
  },
}
