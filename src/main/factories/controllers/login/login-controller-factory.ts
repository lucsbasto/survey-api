import { LoginController } from '../../../../presentation/controllers/a/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const validationComposite = makeLoginValidation()
  const dbAuthentication = makeDbAuthentication()
  return new LoginController(dbAuthentication, validationComposite)
}
