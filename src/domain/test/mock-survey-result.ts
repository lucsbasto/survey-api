import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultParams = (): SurveyResultModel => (
  {
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
    id: 'any_id',
    surveyId: 'any_survey_id'
  }
)

export const mockSurveyResultModel = (): SaveSurveyResultParams => (
  {
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
    surveyId: 'any_survey_id'
  }
)
