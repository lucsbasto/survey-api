import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '../controllers/survey-result/save-survey-result-controller-protocols'

export const mockSurveyResult = (): SurveyResultModel => ({
  id: 'valid_id',
  surveyId: 'valid_survey_id',
  accountId: 'valid_account_id',
  answer: 'valid_answer',
  date: new Date()
})

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResult()))
    }
  }
  return new SaveSurveyResultStub()
}
