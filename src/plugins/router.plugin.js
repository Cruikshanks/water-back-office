import AssetRoutes from 'water-engine/routes/assets.routes.js'
import RootRoutes from 'water-engine/routes/root.routes.js'

import BillRunRoutes from '../routes/bill-runs.routes.js'
import LicenceRoutes from '../routes/licences.routes.js'

const routes = [...RootRoutes, ...AssetRoutes, ...BillRunRoutes, ...LicenceRoutes]

export default {
  name: 'router',
  register: (server, _options) => {
    server.route(routes)
  }
}
