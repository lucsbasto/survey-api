import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AuthenticationParams } from '../usecases/account/authentication'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddAccountParams = (): AddAccountParams => {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

export const mockAddAccountWithTokenParams = (): AddAccountParams => {
  return Object.assign({}, mockAddAccountParams(), { accessToken: 'any_token' })
}

export const mockAddAccountWithRoleParams = (): AddAccountParams => {
  return Object.assign({}, mockAddAccountWithTokenParams(), { role: 'admin' })
}

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com', password: 'any_password'
})
