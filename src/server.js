import Hapi from '@hapi/hapi'

import ViewBillRunService from 'water-engine/services/bill-runs/view-bill-run.service.js'
import ViewLicenceService from 'water-engine/services/licences/view-licence.service.js'

export async function init () {
  const server = Hapi.server({
    port: 3002,
    host: 'localhost'
  })

  server.route({
    method: 'GET',
    path: '/licences/{licenceId}',
    handler: (request, h) => {
      const { licenceId } = request.params
      return ViewLicenceService(licenceId)
    }
  })

  server.route({
    method: 'GET',
    path: '/bill-runs/{billRunId}',
    handler: (request, h) => {
      const { billRunId } = request.params
      return ViewBillRunService(billRunId)
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
