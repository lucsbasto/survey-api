import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadEmailByAccountRepository } from '../../protocols/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account.protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadEmailByAccountRepository => {
  class LoadEmailByAccountRepositoryStub implements LoadEmailByAccountRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadEmailByAccountRepositoryStub()
}

const makeFaceAuthentication = (): AuthenticationModel => ({ email: 'any_email@mail.com', password: 'any_password' })

interface SutTypes {
  sut: DbAuthentication
  loadEmailByAccountRepositoryStub: LoadEmailByAccountRepository
}

const makeSut = (): SutTypes => {
  const loadEmailByAccountRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadEmailByAccountRepositoryStub)
  return {
    sut,
    loadEmailByAccountRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const {
      sut,
      loadEmailByAccountRepositoryStub
    } = makeSut()
    const loadSpy = jest.spyOn(loadEmailByAccountRepositoryStub, 'load')
    await sut.auth(makeFaceAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
