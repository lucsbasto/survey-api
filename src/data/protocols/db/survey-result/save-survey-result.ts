import { SurveyResultModel } from '../../../../domain/models/survey-result'
import { SaveSurveyResultParams } from '../../../../domain/usecases/survey-result/save-survey-result'

export class SurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return Promise.resolve(null)
  }
}
