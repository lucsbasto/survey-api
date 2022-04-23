import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'
import { mockValidation } from '../test'
import { ValidationComposite } from './validator-composite'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(),mockValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error())
  })
  test('should not return  if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
