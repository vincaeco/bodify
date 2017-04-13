const DBName = process.env.DB_NAME + '_test';

module.exports = {
  db: {
    name: DBName,
    uri: `mongodb://${process.env.DB_HOST}/${DBName}`
  },
  password: {
    hash: 'hash'
  },
  jwt: {
    secret: 'secret'
  },
  server: {
    port: 3005
  }
}
