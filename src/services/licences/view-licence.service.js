/**
 * Orchestrates fetching and presenting the data needed for the licence page
 * @module ViewLicenceService
 */

import FetchLicenceDal from 'water-engine/dal/licences/fetch-licence.dal.js'

import DetermineLicenceInWorkflow from '../../dal/licences/determine-licence-in-workflow.dal.js'

/**
 * Orchestrates fetching and presenting the data needed for the licence page
 *
 * @param {string} licenceId - The UUID for the licence to view
 *
 * @returns {<object>} an object representing the `pageData` needed by the view licence template. It contains
 * details of the licence and any linked data plus the page title.
 */
export default async function viewLicenceService(licenceId) {
  const licence = await FetchLicenceDal(licenceId)

  const notification = await _notification(licenceId)

  return {
    notification,
    pageTitle: `Licence summary ${licence.licenceRef}`,
    pageTitleCaption: 'Unregistered licence',
    ...licence
  }
}

async function _notification(licenceId) {
  const licenceInWorkflow = await DetermineLicenceInWorkflow(licenceId)

  if (!licenceInWorkflow) {
    return null
  }

  return {
    text: 'This licence will be excluded from billing until it is no longer in workflow',
    titleText: 'Licence in workflow.'
  }
}
