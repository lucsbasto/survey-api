import MockDate from 'mockdate'
import { SurveyModel, LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { throwError } from '@/domain/test'

const makeFakeSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{ image: 'any_image', answer: 'any_answer' }],
    date: new Date()
  }
}

const makeLoadSurveyByIdRepositoryStub = (): any => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await Promise.resolve(makeFakeSurvey())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveysById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toBeCalledWith('any_id')
  })
  test('should return a survey on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById('any_id')
    expect(surveys).toEqual(makeFakeSurvey())
  })
  test('should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const error = sut.loadById('any_id')
    expect(error).rejects.toThrow()
  })
})
