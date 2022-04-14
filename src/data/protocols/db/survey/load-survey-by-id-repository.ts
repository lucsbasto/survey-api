import { SurveyModel } from '@/domain/models/survey'

export class LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}
