import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { SurveyModel } from '@/domain/models/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveyRepository: LoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll()
    return surveys
  }
}
