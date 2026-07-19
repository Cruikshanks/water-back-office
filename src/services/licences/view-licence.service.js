/**
 * Orchestrates fetching and presenting the data needed for the licence page
 * @module ViewLicenceService
 */

import FetchLicenceService from 'water-engine/dal/licences/fetch-licence.service.js'

/**
 * Orchestrates fetching and presenting the data needed for the licence page
 *
 * @param {string} licenceId - The UUID for the licence to view
 *
 * @returns {<object>} an object representing the `pageData` needed by the view licence template. It contains
 * details of the licence and any linked data plus the page title.
 */
export default function viewLicenceService(licenceId) {
  return FetchLicenceService(licenceId)
}
