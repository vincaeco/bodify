module.exports = {
  db: {
    name: process.env.DB_NAME,
    uri: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
  },
  password: {
    hash: process.env.PASSWORD_HASH
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  server: {
    port: 3000
  }
}
