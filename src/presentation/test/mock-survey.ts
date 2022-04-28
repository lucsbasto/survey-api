import { LoadSurveyResult } from '../../domain/usecases/survey-result/load-survey-result'
import { LoadSurveyById, LoadSurveys, SurveyModel } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'
import { AddSurvey, AddSurveyParams } from '../controllers/survey/add-survey/add-survey-protocols'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '../../domain/test'

const mockSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date()
})

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey())
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (id: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return Promise.resolve(null)
    }
  }
  return new AddSurveyStub()
}

export const mockSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{ image: 'other_image', answer: 'other_answer' }],
      date: new Date()
    }
  ]
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveys())
    }
  }
  return new LoadSurveysStub()
}
