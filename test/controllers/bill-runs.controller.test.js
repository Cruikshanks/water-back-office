// Test framework
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

// Test helpers
import LoggerStub from 'water-engine/test/stubs/logger.stub.js'
import { generateUUID } from 'water-engine/test/generators.js'
import http2 from 'node:http2'
import { yesterday } from 'water-engine/test/general.js'

// Things we need to stub
import * as ViewBillRunService from '../../src/services/bill-runs/view-bill-run.service.js'

// For running our service
import { init } from '../../src/server.js'

const { HTTP_STATUS_OK } = http2.constants

describe('Bill Runs controller', () => {
  let billRun
  let options
  let server

  // Create server before running the tests
  beforeAll(async () => {
    server = await init()
  })

  beforeEach(async () => {
    // We silence any calls to server.logger made in the plugin to try and keep the test output as clean as possible
    LoggerStub(server.logger)

    // We silence sending a notification to our Errbit instance using Airbrake
    vi.spyOn(server.app.airbrake, 'notify').mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  afterAll(async () => {
    await server.stop()
  })

  describe('/bill-runs/{id}', () => {
    describe('GET', () => {
      beforeEach(() => {
        billRun = {
          batchType: 'annual',
          dateCreated: yesterday(),
          pageTitle: 'Bill run summary 10066',
          pageTitleCaption: 'Midlands annual',
          toFinancialYearEnding: 2026,
          transactionFileReference: 'nalwi50007t'
        }

        options = {
          method: 'GET',
          url: `/bill-runs/${generateUUID()}`
        }
      })

      describe('when the request succeeds', () => {
        beforeEach(() => {
          vi.spyOn(ViewBillRunService, 'default').mockResolvedValue(billRun)
        })

        it('returns the page successfully', async () => {
          const response = await server.inject(options)

          expect(response.statusCode).toEqual(HTTP_STATUS_OK)
          expect(response.payload).toContain(billRun.pageTitle)
        })
      })
    })
  })
})
