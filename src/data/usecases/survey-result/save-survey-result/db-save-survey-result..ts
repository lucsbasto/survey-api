import {
  SaveSurveyResultParams,
  SaveSurveyResult,
  SaveSurveyResultRepository,
  LoadSurveyResultRepository,
  SurveyResultModel
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResults = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResults
  }
}
