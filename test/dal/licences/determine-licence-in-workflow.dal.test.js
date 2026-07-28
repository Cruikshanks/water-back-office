// Test framework
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// Test helpers
import WorkflowHelper from 'water-engine/test/helpers/workflow.helper.js'
import { generateUUID } from 'water-engine/test/generators.js'

// Thing under test
import DetermineLicenceInWorkflowDal from '../../../src/dal/licences/determine-licence-in-workflow.dal.js'

describe('Licences - Determine Licence in Workflow DAL', () => {
  let workflow

  beforeAll(async () => {
    workflow = await WorkflowHelper.add({ licenceId: generateUUID() })
  })

  afterAll(async () => {
    await workflow.$query().delete()
  })

  describe('when the licence is in "workflow"', () => {
    it('returns "true"', async () => {
      const result = await DetermineLicenceInWorkflowDal(workflow.licenceId)

      expect(result).toEqual(true)
    })
  })

  describe('when the licence is not in "workflow"', () => {
    it('returns "false"', async () => {
      const result = await DetermineLicenceInWorkflowDal(generateUUID())

      expect(result).toEqual(false)
    })
  })
})
