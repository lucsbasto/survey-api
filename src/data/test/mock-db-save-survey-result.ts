import { SurveyResultModel } from '@/domain/models/survey-result'
import { SurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result'
import { SaveSurveyResultParams } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { mockSurveyResultModel } from '@/domain/test/mock-survey-result'

export const mockSurveyResultRepository = (): SurveyResultRepository => {
  class SurveyResultRepositoryStub implements SurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SurveyResultRepositoryStub()
}
