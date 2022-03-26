import { AccountModel } from '../../domain/models/account'

export interface LoadEmailByAccountRepository {
  load: (email: string) => Promise<AccountModel>
}
