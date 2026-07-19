import http2 from 'node:http2'

import ViewLicenceService from '../services/licences/view-licence.service.js'

const { HTTP_STATUS_OK } = http2.constants

export async function viewLicence(request, h) {
  const { id: licenceId } = request.params

  const pageData = await ViewLicenceService(licenceId)

  return h.response(pageData).code(HTTP_STATUS_OK)
}
