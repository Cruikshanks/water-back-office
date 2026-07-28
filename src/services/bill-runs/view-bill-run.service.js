/**
 * Orchestrates fetching and presenting the data needed for the bill run page
 * @module ViewBillService
 */

import FetchBillRunDal from 'water-engine/dal/bill-runs/fetch-bill-run.dal.js'

/**
 * Orchestrates fetching and presenting the data needed for the bill run page
 *
 * @param {string} billRunId - The UUID for the bill run to view
 *
 * @returns {<object>} an object representing the `pageData` needed by the view bill run template. It contains
 * details of the bill run and the bills linked to it plus the page title.
 */
export default async function viewBillRunService(billRunId) {
  const billRun = await FetchBillRunDal(billRunId)

  return {
    pageTitle: `Bill run summary ${billRun.billRunNumber}`,
    pageTitleCaption: `Midlands ${billRun.batchType}`,
    ...billRun
  }
}
