import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, Validation, AddSurvey, HttpResponse } from './add-survey-controller.protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers, date } = httpRequest.body
      await this.addSurvey.add({ question, answers, date })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
