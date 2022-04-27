import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
  return { sut, loadSurveyResultRepositoryStub }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('should call LoadSurveyResultRepository with correct surveyId', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadSurveyByIdSpy).toBeCalledWith('any_survey_id')
  })
  test('should throw if SurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const error = sut.load('any_survey_id')
    expect(error).rejects.toThrow()
  })
})
