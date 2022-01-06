import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../error/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let missingParamError = ''
    if (!httpRequest.body.name) {
      missingParamError = 'name'
    }
    if (!httpRequest.body.email) {
      missingParamError = 'email'
    }
    return badRequest(new MissingParamError(missingParamError))
  }
}
