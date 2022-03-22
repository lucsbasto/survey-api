import { MissingParamError } from '../../../presentation/errors'
import { RequiredValidation } from './required-field-validation'

describe('RequiredFields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
