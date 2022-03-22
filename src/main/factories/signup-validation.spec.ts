import { Validation } from '../../presentation/helpers/validators/validation'
import { RequiredValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validator-composite'
import { makeSignUpValidation } from './signup-validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'

jest.mock('../../presentation/helpers/validators/validator-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name','email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
