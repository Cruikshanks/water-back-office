import ViewBillRunService from '../services/bill-runs/view-bill-run.service.js'

export async function viewBillRun(request, h) {
  const { id: billRunId } = request.params

  const pageData = await ViewBillRunService(billRunId)

  return h.view('bill-runs/view.njk', pageData)
}
