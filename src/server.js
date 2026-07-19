import Hapi from '@hapi/hapi'

import RouterPlugin from './plugins/router.plugin.js'
import ServerConfig from '../config/server.config.js'

export async function init () {
  const server = Hapi.server(ServerConfig.hapi)

  await _registerPlugins(server)
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

async function _registerPlugins (server) {
  await server.register(RouterPlugin)
}
