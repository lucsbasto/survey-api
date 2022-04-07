import { SignUpController } from '../../../presentation/controllers/signup/singup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db.add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import env from '../../config/env'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const validationComposite = makeSignUpValidation()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(dbAddAccount, validationComposite, dbAuthentication)
}
