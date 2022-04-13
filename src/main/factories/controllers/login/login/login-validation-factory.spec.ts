import {
  ValidationComposite,
  EmailValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email',makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
