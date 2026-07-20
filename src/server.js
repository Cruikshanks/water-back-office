import BaseServer from 'water-engine/base-server'

import RouterPlugin from './plugins/router.plugin.js'
import ServerConfig from '../config/server.config.js'

/**
 * Initialises the Hapi server without starting it
 *
 * Creates the server, registers all plugins, and calls `server.initialize()` which completes the plugin
 * registration process. Returns the initialised server instance without beginning to accept connections.
 *
 * This is primarily used in testing to get a server instance that can handle injected requests without
 * binding to a port.
 *
 * @returns {Promise<object>} The initialised Hapi server instance
 */
export async function init() {
  const server = await BaseServer(ServerConfig.hapi)

  await _registerPlugins(server)
  await server.initialize()

  return server
}

/**
 * Starts the Hapi server and begins accepting connections
 *
 * Calls `init()` to create and initialise the server, then calls `server.start()` which binds to the
 * configured port and begins listening for requests.
 *
 * @returns {Promise<object>} The running Hapi server instance
 */
export async function start() {
  const server = await init()

  await server.start()

  return server
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

async function _registerPlugins(server) {
  // NOTE: This order matters to some plugins we register. Inserting into the order should be fine. But if you reorder
  // any existing plugin registration double-check you haven't broken anything!
  await server.register(RouterPlugin)
}
