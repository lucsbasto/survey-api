import { Middleware } from '../protocols/middleware'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
const makeSut = (): Middleware => {
  return new AuthMiddleware()
}
describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
