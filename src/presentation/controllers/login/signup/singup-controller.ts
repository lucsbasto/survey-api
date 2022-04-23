import { HttpRequest, HttpResponse, Controller, AddAccount, Validation, Authentication } from './signup-protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, role } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password,
        role
      })
      if (account === null) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
