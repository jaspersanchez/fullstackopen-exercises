const info = (...params) => {
  process.env.NODE_ENV !== 'test' && console.error(...params)
}

const error = (...params) =>
  process.env.NODE_ENV !== 'test' && console.error(...params)

module.exports = { info, error }
