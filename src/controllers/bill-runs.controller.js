import http2 from 'node:http2'

import ViewBillRunService from '../services/bill-runs/view-bill-run.service.js'

const { HTTP_STATUS_OK } = http2.constants

export async function viewBillRun(request, h) {
  const { id: billRunId } = request.params

  const pageData = await ViewBillRunService(billRunId)

  return h.response(pageData).code(HTTP_STATUS_OK)
}
