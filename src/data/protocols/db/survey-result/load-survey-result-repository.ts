import { SurveyResultModel } from '../../../../domain/models/survey-result'

export class LoadSurveyResultRepository {
  async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    return Promise.resolve(null)
  }
}
