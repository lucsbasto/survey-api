import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../error/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const ret: HttpResponse = { statusCode: 200, body: '' }
    if (!httpRequest.body.name) {
      ret.statusCode = 400
      ret.body = new MissingParamError('name')
    }
    if (!httpRequest.body.email) {
      ret.statusCode = 400
      ret.body = new MissingParamError('email')
    }
    return ret
  }
}
