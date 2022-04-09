import { SignUpController } from '../../../../../presentation/controllers/login/signup/singup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../usecases/acccount/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/acccount/add-account/db-add-account-factory'

export const makeSignUpController = (): Controller => {
  const validationComposite = makeSignUpValidation()
  const dbAuthentication = makeDbAuthentication()
  const dbAddAccount = makeDbAddAccount()
  return new SignUpController(dbAddAccount, validationComposite, dbAuthentication)
}
