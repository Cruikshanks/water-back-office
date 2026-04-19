'use strict'

const Hapi = require('@hapi/hapi')
const { getLicenceDetails } = require('water-engine')

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
      return getLicenceDetails(licenceId)
    }
  })

  await server.start()
  console.log('Back-office server running on %s', server.info.uri)
}

init()
