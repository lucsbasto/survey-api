import { InvalidParamError } from '../../errors'
import { forbidden, serverError } from '../../helpers/http/http-helper'
import { Controller, LoadSurveyById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}
  async handle (httpRequest: any): Promise<any> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return survey
    } catch (error) {
      return serverError(error)
    }
  }
}
