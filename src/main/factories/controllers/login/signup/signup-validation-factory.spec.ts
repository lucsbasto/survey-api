import {
  ValidationComposite,
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { EmailValidator } from '@/validation/protocols/email-validator'
jest.mock('../../../../../validation/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name','email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email',makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
