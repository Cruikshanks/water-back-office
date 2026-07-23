import BaseServer from 'water-engine/base-server'

import AirbrakeConfig from '../config/airbrake.config.js'
import HapiConfig from '../config/hapi.config.js'
import RouterPlugin from './plugins/router.plugin.js'
import ServerConfig from '../config/server.config.js'
import YarConfig from '../config/yar.config.js'

/**
 * Initialises the Hapi server without starting it
 *
 * Creates the server, registers all plugins, and calls `server.initialize()` which completes the plugin registration
 * process. Returns the initialised server instance without beginning to accept connections.
 *
 * This is primarily used in testing to get a server instance that can handle injected requests without binding to a
 * port.
 *
 * @returns {Promise<object>} The initialised Hapi server instance
 */
export async function init() {
  const config = _config()

  const server = await BaseServer(config)

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

function _config() {
  return {
    airbrake: AirbrakeConfig,
    hapi: HapiConfig,
    server: ServerConfig,
    vision: _visionConfig(),
    yar: YarConfig
  }
}

async function _registerPlugins(server) {
  // NOTE: This order matters to some plugins we register. Inserting into the order should be fine. But if you reorder
  // any existing plugin registration double-check you haven't broken anything!
  await server.register(RouterPlugin)
}

/**
 * The Hapi vision plugin is registered and managed by water-engine to avoid duplication. It also means we can add the
 * govuk frontend and Nunjucks just once to the engine.
 *
 * But the apps need control over the views, so they can be tailored for their different needs. This means the apps need
 * to tell the engine what config Vision should use. This essentially comes down to telling Vision, and Nunjucks where
 * to find stuff. For that to happen we need to dynamically resolve the path to the views directory relative to this at
 * run time.
 *
 * This is why the config is here and not in the `config/` directory.
 *
 * @private
 */
function _visionConfig() {
  return {
    // Only enable caching of templates if we are running in production
    isCached: process.env.NODE_ENV === 'production',
    // the root file path used to resolve and load the templates identified when calling h.view()
    path: 'views',
    // The base path used as prefix for `path:`. It will dynamically resolve to the directory containing this file
    // (…/src/server.js) so that the `path:` is relative to this file.
    relativeTo: import.meta.dirname
  }
}
