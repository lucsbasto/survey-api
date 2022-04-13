import { SurveyModel } from '@/domain/models/survey'

export class LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
