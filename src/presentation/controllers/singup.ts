import { HttpRequest, HttpResponse } from '../protocols/http'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const ret: HttpResponse = { statusCode: 200, body: '' }
    if (!httpRequest.body.name) {
      ret.statusCode = 400
      ret.body = new Error('Missing param: name')
    }
    if (!httpRequest.body.email) {
      ret.statusCode = 400
      ret.body = new Error('Missing param: email')
    }
    return ret
  }
}
