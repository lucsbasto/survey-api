import {
  LoadSurveyByIdRepository,
  LoadSurveyById,
  SurveyModel
} from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const surveys = await this.loadSurveyByIdRepository.loadById(id)
    return surveys
  }
}
