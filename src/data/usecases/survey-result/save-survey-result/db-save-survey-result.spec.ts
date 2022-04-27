import { DbSaveSurveyResult } from './db-save-survey-result.'
import MockDate from 'mockdate'
import { SurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result'
import { throwError, mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test'
import { mockSurveyResultRepository } from '@/data/test/mock-db-save-survey-result'

type SutTypes = {
  sut: DbSaveSurveyResult
  surveyResultRepositoryStub: SurveyResultRepository
}

const makeSut = (): SutTypes => {
  const surveyResultRepositoryStub = mockSurveyResultRepository()
  const sut = new DbSaveSurveyResult(surveyResultRepositoryStub)
  return {
    sut,
    surveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call SurveyResultRepository with correct values', async () => {
    const { sut, surveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(surveyResultRepositoryStub, 'save')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
  test('should throw if SurveyResultRepository throws', async () => {
    const { sut, surveyResultRepositoryStub } = makeSut()
    jest.spyOn(surveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const surveyResultData = mockSaveSurveyResultParams()
    const error = sut.save(surveyResultData)
    expect(error).rejects.toThrow()
  })
  test('should return a SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = mockSaveSurveyResultParams()
    const surveys = await sut.save(surveyResultData)
    expect(surveys).toEqual(mockSurveyResultModel())
  })
})
