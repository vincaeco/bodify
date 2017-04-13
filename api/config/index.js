module.exports = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return require('./production')
    case 'test':
      return require('./test')
    default:
      return require('./development')
  }
})()
