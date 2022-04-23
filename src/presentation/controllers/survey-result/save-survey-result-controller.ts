import { InvalidParamError } from '../../errors'
import { forbidden, serverError } from '../../helpers/http/http-helper'
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
        await this.saveSurveyResult.save({
          accountId,
          surveyId,
          answer,
          date
        })
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return survey
    } catch (error) {
      return serverError(error)
    }
  }
}
