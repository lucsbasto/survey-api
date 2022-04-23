import {
  SurveyResultModel,
  SaveSurveyResultModel,
  SaveSurveyResult,
  SurveyResultRepository
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const saveSurveyResult = await this.saveSurveyResultRepository.save(data)
    return saveSurveyResult
  }
}
