import { AccountModel } from '../../../domain/models/account'

export interface LoadEmailByAccountRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
