import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result.'
import { SurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultRepository = new SurveyResultRepository()
  return new DbSaveSurveyResult(surveyResultRepository)
}
