import { LoadSurveyController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadSurvey } from '@/main/factories/usecases/survey/load-surveys/db-load-survey-factory'

export const makeLoadSurveyController = (): Controller => {
  const dbLoadSurveys = makeDbLoadSurvey()
  const controller = new LoadSurveyController(dbLoadSurveys)
  return controller
}
