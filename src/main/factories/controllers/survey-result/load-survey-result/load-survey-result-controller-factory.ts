import { Controller } from '@/presentation/protocols'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/load-survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyById = makeDbLoadSurveyById()
  const loadSurveyResult = makeDbLoadSurveyResult()
  const controller = new LoadSurveyResultController(loadSurveyById, loadSurveyResult)
  return controller
}
