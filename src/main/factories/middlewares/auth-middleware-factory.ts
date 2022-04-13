
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '../usecases/acccount/load-account-by-token/load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const dbLoadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(dbLoadAccountByToken, role)
}
