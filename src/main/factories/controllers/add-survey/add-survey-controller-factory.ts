import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const validation = makeAddSurveyValidation()
  const dbAddSurvey = makeDbAddSurvey()
  const controller = new AddSurveyController(validation, dbAddSurvey)
  return controller
}
