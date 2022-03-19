import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../signup/signup.protocols'
export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
  }
}
