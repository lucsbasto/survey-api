import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import { AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'

export const makeDbAddSurvey = (): AddSurvey => {
  const addSurveyRepository = new AddSurveyRepository()
  return new DbAddSurvey(addSurveyRepository)
}
