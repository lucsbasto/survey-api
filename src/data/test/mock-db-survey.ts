import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'
import { AddSurveyRepository } from '../protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '../usecases/survey/add-survey/db-add-survey-protocols'

export const mockLoadSurveysRepository = (): any => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveysRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): any => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockAddSurveyRepository = (): any => {
  class AddSurveyStub implements AddSurveyRepository {
    async add (data: AddSurveyParams): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new AddSurveyStub()
}
