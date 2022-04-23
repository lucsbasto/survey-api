import { InvalidParamError } from '../../errors'
import { forbidden, ok, serverError } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<any> {
    try {
      const { surveyId } = httpRequest.params
      const { accountId } = httpRequest
      const { answer, date } = httpRequest.body
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
