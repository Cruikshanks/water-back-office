'use strict'

const Hapi = require('@hapi/hapi')

const { ViewLicenceService } = require('water-engine')

const init = async () => {
  const server = Hapi.server({
    port: 3002,
    host: 'localhost'
  })

  server.route({
    method: 'GET',
    path: '/licence/{licenceId}',
    handler: (request, h) => {
      const { licenceId } = request.params
      return ViewLicenceService.go(licenceId)
    }
  })

  await server.initialize()

  return server
}

const start = async () => {
  const server = await init()

  await server.start()

  console.log('Back-office server running on %s', server.info.uri)

  return server
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

module.exports = { init, start }
