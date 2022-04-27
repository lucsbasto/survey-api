import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { mockSurveyResultModel } from '@/domain/test/mock-survey-result'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from '../../../protocols/db/survey-result/load-survey-result'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepositoryStub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
  return { sut, loadSurveyResultRepositoryStub }
}

const makeLoadSurveyResultRepositoryStub = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}

describe('DbLoadSurveyResult UseCase', () => {
  test('should call LoadSurveyResultRepository with correct surveyId', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadSurveyByIdSpy).toBeCalledWith('any_survey_id')
  })
})
