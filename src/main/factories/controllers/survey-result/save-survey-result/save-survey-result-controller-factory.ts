import { Controller } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const loadSurveyById = makeDbLoadSurveyById()
  const saveSurveyResult = makeDbSaveSurveyResult()
  const controller = new SaveSurveyResultController(loadSurveyById, saveSurveyResult)
  return controller
}
