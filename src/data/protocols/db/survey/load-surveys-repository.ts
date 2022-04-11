import { SurveyModel } from '../../../../domain/models/survey'

export class LoadSurveysRepository {
  async loadAll (): Promise<SurveyModel[]> {
    return new Promise(resolve => resolve(null))
  }
}
