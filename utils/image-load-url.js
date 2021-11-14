const https = require('https')
const http = require('http')

module.exports = (url) => {
  const client = url.indexOf('https') === 0 ? https : http
  return new Promise(async (resolve, reject) => {
    client.get(url, (res) => {
      const chunks = []

      res.on('error', (err) => {
        reject(err)
      })
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })
  })
}
