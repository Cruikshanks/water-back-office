import FetchBillRunService from 'water-engine/dal/bill-runs/fetch-bill-run.service.js'

export default function viewBillRunService (billRunId) {
  return FetchBillRunService(billRunId)
}
