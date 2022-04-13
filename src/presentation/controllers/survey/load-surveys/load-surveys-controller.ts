import { Controller , LoadSurveys, HttpRequest, HttpResponse } from './load-surveys-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadSurveyController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
