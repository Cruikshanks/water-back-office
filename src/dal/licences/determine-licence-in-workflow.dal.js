/**
 * Determine if a licence has an active workflow record, i.e. is in 'workflow'
 * @module DetermineLicenceInWorkflowDal
 */

import WorkflowModel from 'water-engine/models/workflow.model.js'

/**
 * Determine if a licence has an active workflow record, i.e. is in 'workflow'
 *
 * @param {string} licenceId - The UUID of the licence to check for an active workflow record
 *
 * @returns {Promise<boolean>}
 */
export default async function determineLicenceInWorkflowDal(licenceId) {
  const result = await WorkflowModel.query().where('licenceId', licenceId).whereNull('deletedAt').limit(1).first()

  return !!result
}
