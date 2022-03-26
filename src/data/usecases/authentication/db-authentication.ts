import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadEmailByAccountRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository
  constructor (loadAccountByEmailRepository: LoadEmailByAccountRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth ({ email, password }: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(email)
    return null
  }
}
