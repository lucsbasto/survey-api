import { LoadEmailByAccountRepository } from '../../protocols/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account.protocols'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadEmailByAccountRepositoryStub implements LoadEmailByAccountRepository {
      async load (email: string): Promise<AccountModel> {
        const accountModel: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        }
        return new Promise(resolve => resolve(accountModel))
      }
    }
    const loadEmailByAccountRepositoryStub = new LoadEmailByAccountRepositoryStub()
    const sut = new DbAuthentication(loadEmailByAccountRepositoryStub)
    const loadSpy = jest.spyOn(loadEmailByAccountRepositoryStub, 'load')
    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
