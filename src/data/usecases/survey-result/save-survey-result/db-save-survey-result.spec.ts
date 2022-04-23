import { DbSaveSurveyResult } from './db-save-survey-result.'
import MockDate from 'mockdate'
import { SaveSurveyResultParams } from '../../../../domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '../../../../domain/models/survey-result'
import { SurveyResultRepository } from '../../../protocols/db/survey-result/save-survey-result'
import { throwError } from '@/domain/test'

const makeFakeSurveyResult = (): SurveyResultModel => (
  {
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
    id: 'any_id',
    surveyId: 'any_survey_id'
  }
)

const makeFakeSurveyResultData = (): SaveSurveyResultParams => (
  {
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
    surveyId: 'any_survey_id'
  }
)

type SutTypes = {
  sut: DbSaveSurveyResult
  SurveyResultRepositoryStub: SurveyResultRepository
}

const makeSut = (): SutTypes => {
  const SurveyResultRepositoryStub = makeSurveyResultRepository()
  const sut = new DbSaveSurveyResult(SurveyResultRepositoryStub)
  return {
    sut,
    SurveyResultRepositoryStub
  }
}

const makeSurveyResultRepository = (): SurveyResultRepository => {
  class SurveyResultRepositoryStub implements SurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SurveyResultRepositoryStub()
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call SurveyResultRepository with correct values', async () => {
    const { sut, SurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(SurveyResultRepositoryStub, 'save')
    const surveyResultData = makeFakeSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })
  test('should throw if SurveyResultRepository throws', async () => {
    const { sut, SurveyResultRepositoryStub } = makeSut()
    jest.spyOn(SurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const surveyResultData = makeFakeSurveyResultData()
    const error = sut.save(surveyResultData)
    expect(error).rejects.toThrow()
  })
  test('should return a SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = makeFakeSurveyResultData()
    const surveys = await sut.save(surveyResultData)
    expect(surveys).toEqual(makeFakeSurveyResult())
  })
})
