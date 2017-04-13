const DBName = process.env.DB_NAME + '_test';

module.exports = {
  db: {
    name: DBName,
    uri: `mongodb://${process.env.DB_HOST}/${DBName}`
  },
  password: {
    hash: 123
  },
  jwt: {
    secret: 'secret'
  }
}
