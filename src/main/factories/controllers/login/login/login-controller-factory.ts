import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/usecases/acccount/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const validationComposite = makeLoginValidation()
  const dbAuthentication = makeDbAuthentication()
  return new LoginController(dbAuthentication, validationComposite)
}
