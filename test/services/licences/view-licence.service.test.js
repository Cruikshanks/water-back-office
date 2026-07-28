// Test framework
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Test helpers
import { yesterday } from 'water-engine/test/general.js'
import { generateLicenceRef, generateUUID } from 'water-engine/test/generators.js'

// Things we need to stub
import * as FetchLicenceDal from 'water-engine/dal/licences/fetch-licence.dal.js'

import * as DetermineLicenceInWorkflow from '../../../src/dal/licences/determine-licence-in-workflow.dal.js'

// Thing under test
import ViewLicenceService from '../../../src/services/licences/view-licence.service.js'

describe('Licences - View Licence service', () => {
  let licence

  beforeEach(() => {
    licence = {
      id: generateUUID(),
      licenceRef: generateLicenceRef(),
      startDate: yesterday(),
      issueDate: yesterday(),
      waterUndertaker: false,
      regions: {
        historicalAreaCode: 'KAEA',
        regionalChargeArea: 'Southern',
        standardUnitChargeCode: 'SUCSO',
        localEnvironmentAgencyPlanCode: 'LEME'
      }
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('when a licence with a matching ID exists', () => {
    beforeEach(() => {
      vi.spyOn(FetchLicenceDal, 'default').mockResolvedValue(licence)
    })

    describe('and the licence is not in "workflow"', () => {
      beforeEach(() => {
        vi.spyOn(DetermineLicenceInWorkflow, 'default').mockResolvedValue(false)
      })

      it('correctly presents the data', async () => {
        const result = await ViewLicenceService(licence.id)

        expect(result).toEqual({
          notification: null,
          pageTitle: `Licence summary ${licence.licenceRef}`,
          pageTitleCaption: 'Unregistered licence',
          ...licence
        })
      })
    })

    describe('and the licence is in "workflow"', () => {
      beforeEach(() => {
        vi.spyOn(DetermineLicenceInWorkflow, 'default').mockResolvedValue(true)
      })

      it('correctly presents the data', async () => {
        const result = await ViewLicenceService(licence.id)

        expect(result).toEqual({
          notification: {
            text: 'This licence will be excluded from billing until it is no longer in workflow',
            titleText: 'Licence in workflow.'
          },
          pageTitle: `Licence summary ${licence.licenceRef}`,
          pageTitleCaption: 'Unregistered licence',
          ...licence
        })
      })
    })
  })

  describe('when a licence with a matching ID does not exist', () => {
    beforeEach(() => {
      vi.spyOn(FetchLicenceDal, 'default').mockResolvedValue(null)
    })

    it('throws an exception', async () => {
      await expect(ViewLicenceService(licence.id)).rejects.toThrow()
    })
  })
})
