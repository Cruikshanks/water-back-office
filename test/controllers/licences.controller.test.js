// Test framework
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

// Test helpers
import LoggerStub from 'water-engine/test/stubs/logger.stub.js'
import http2 from 'node:http2'
import { yesterday } from 'water-engine/test/general.js'
import { generateLicenceRef, generateUUID } from 'water-engine/test/generators.js'

// Things we need to stub
import * as ViewLicenceService from '../../src/services/licences/view-licence.service.js'

// For running our service
import { init } from '../../src/server.js'

const { HTTP_STATUS_OK } = http2.constants

describe('Licences controller', () => {
  let licence
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

  describe('/licences/{id}', () => {
    describe('GET', () => {
      beforeEach(() => {
        licence = {
          notification: null,
          pageTitle: `Licence summary ${generateLicenceRef()}`,
          pageTitleCaption: 'Unregistered licence',
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

        options = {
          method: 'GET',
          url: `/licences/${generateUUID()}`
        }
      })

      describe('when the request succeeds', () => {
        beforeEach(() => {
          vi.spyOn(ViewLicenceService, 'default').mockResolvedValue(licence)
        })

        it('returns the page successfully', async () => {
          const response = await server.inject(options)

          expect(response.statusCode).toEqual(HTTP_STATUS_OK)
          expect(response.payload).toContain(licence.pageTitle)
        })
      })
    })
  })
})
