import { DbSaveSurveyResult } from './db-save-survey-result.'
import MockDate from 'mockdate'
import { SaveSurveyResultModel } from '../../../domain/usecases/save-survey-result'
import { SurveyResultModel } from '../../../domain/models/survey-result'
import { SaveSurveyResultRepository } from '../../protocols/db/survey/save-survey-result'

const makeFakeSurveyResult = (): SurveyResultModel => (
  {
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
    id: 'any_id',
    surveyId: 'any_survey_id'
  }
)

const makeFakeSurveyResultData = (): SaveSurveyResultModel => (
  {
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
    surveyId: 'any_survey_id'
  }
)

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call SurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = makeFakeSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
  test('should throw if SurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const surveyResultData = makeFakeSurveyResultData()
    const error = sut.save(surveyResultData)
    expect(error).rejects.toThrow()
  })
})
