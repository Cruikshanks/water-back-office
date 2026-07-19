import { viewBillRun } from '../controllers/bill-runs.controller.js'

export default [
  {
    method: 'GET',
    path: '/bill-runs/{id}',
    handler: viewBillRun
  }
]
