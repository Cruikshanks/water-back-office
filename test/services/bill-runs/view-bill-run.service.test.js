// Test framework
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Test helpers
import { generateUUID } from 'water-engine/test/generators.js'
import { yesterday } from 'water-engine/test/general.js'

// Things we need to stub
import * as FetchBillRunDal from 'water-engine/dal/bill-runs/fetch-bill-run.dal.js'

// Thing under test
import ViewBillRunService from '../../../src/services/bill-runs/view-bill-run.service.js'

describe('Bill Runs - View Bill Run service', () => {
  let billRun
  let id

  beforeEach(() => {
    id = generateUUID()

    billRun = {
      batchType: 'annual',
      billRunNumber: 10066,
      dateCreated: yesterday(),
      id,
      toFinancialYearEnding: 2026,
      transactionFileReference: 'nalwi50007t'
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('when a bill run with a matching ID exists', () => {
    beforeEach(() => {
      vi.spyOn(FetchBillRunDal, 'default').mockResolvedValue(billRun)
    })

    it('correctly presents the data', async () => {
      const result = await ViewBillRunService(id)

      expect(result).toEqual({
        pageTitle: `Bill run summary ${billRun.billRunNumber}`,
        pageTitleCaption: `Midlands ${billRun.batchType}`,
        ...billRun
      })
    })
  })

  describe('when a bill run with a matching ID does not exist', () => {
    beforeEach(() => {
      vi.spyOn(FetchBillRunDal, 'default').mockResolvedValue(null)
    })

    it('throws an exception', async () => {
      await expect(ViewBillRunService(id)).rejects.toThrow()
    })
  })
})
