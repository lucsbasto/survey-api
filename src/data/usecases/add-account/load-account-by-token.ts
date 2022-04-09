import { AccountModel } from '../../../domain/models/account'

export interface LoadAccountByToken {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel>
}
