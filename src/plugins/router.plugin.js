import BillRunRoutes from '../routes/bill-runs.routes.js'
import LicenceRoutes from '../routes/licences.routes.js'

const routes = [
  ...BillRunRoutes,
  ...LicenceRoutes
]

export default {
  name: 'router',
  register: (server, _options) => {
    server.route(routes)
  }
}
