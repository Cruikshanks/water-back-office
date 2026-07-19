/**
 * Orchestrates fetching and presenting the data needed for the bill run page
 * @module ViewBillService
 */

import FetchBillRunService from 'water-engine/dal/bill-runs/fetch-bill-run.service.js'

/**
 * Orchestrates fetching and presenting the data needed for the bill run page
 *
 * @param {string} billRunId - The UUID for the bill run to view
 *
 * @returns {<object>} an object representing the `pageData` needed by the view bill run template. It contains
 * details of the bill run and the bills linked to it plus the page title.
 */
export default function viewBillRunService(billRunId) {
  return FetchBillRunService(billRunId)
}
