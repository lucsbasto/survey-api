import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { LoadEmailByAccountRepository } from '../../protocols/db/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account.protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByEmailRepository = (): LoadEmailByAccountRepository => {
  class LoadEmailByAccountRepositoryStub implements LoadEmailByAccountRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadEmailByAccountRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({ email: 'any_email@mail.com', password: 'any_password' })

interface SutTypes {
  sut: DbAuthentication
  loadEmailByAccountRepositoryStub: LoadEmailByAccountRepository
  hashComparerStub: HashComparer

}

const makeSut = (): SutTypes => {
  const loadEmailByAccountRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const sut = new DbAuthentication(loadEmailByAccountRepositoryStub, hashComparerStub)
  return {
    sut,
    loadEmailByAccountRepositoryStub,
    hashComparerStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const {
      sut,
      loadEmailByAccountRepositoryStub
    } = makeSut()
    const loadSpy = jest.spyOn(loadEmailByAccountRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const {
      sut,
      loadEmailByAccountRepositoryStub
    } = makeSut()
    jest.spyOn(loadEmailByAccountRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const {
      sut,
      loadEmailByAccountRepositoryStub
    } = makeSut()
    jest.spyOn(loadEmailByAccountRepositoryStub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })
  test('should call HashComparer with correct value', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(null)
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('hashed_password', 'any_password')
  })
})
