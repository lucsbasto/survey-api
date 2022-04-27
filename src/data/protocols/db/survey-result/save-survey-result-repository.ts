import { SaveSurveyResultParams } from '../../../../domain/usecases/survey-result/save-survey-result'

export class SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<void> {
    return Promise.resolve(null)
  }
}
