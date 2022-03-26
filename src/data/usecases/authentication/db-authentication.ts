import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadEmailByAccountRepository,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository
  private readonly hashComparer
  private readonly tokenGenerator
  private readonly updateAccessTokenRepository
  constructor (loadAccountByEmailRepository: LoadEmailByAccountRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth ({ email, password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (account) {
      const isValid = await this.hashComparer.compare(account.password, password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
