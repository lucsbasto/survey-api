import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'
describe('Jwt Adapter', () => {
  test('Should call sign correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
