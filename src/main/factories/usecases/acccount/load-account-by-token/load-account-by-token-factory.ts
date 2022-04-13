import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const secret = env.jwtSecret
  const jwtAdapter = new JwtAdapter(secret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
