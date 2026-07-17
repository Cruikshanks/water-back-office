import Hapi from '@hapi/hapi'

import { ViewLicenceService } from 'water-engine/services'

export async function init () {
  const server = Hapi.server({
    port: 3002,
    host: 'localhost'
  })

  server.route({
    method: 'GET',
    path: '/licence/{licenceId}',
    handler: (request, h) => {
      const { licenceId } = request.params
      return ViewLicenceService(licenceId)
    }
  })

  await server.initialize()

  return server
}

export async function start () {
  const server = await init()

  await server.start()

  console.log('Back-office server running on %s', server.info.uri)

  return server
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
