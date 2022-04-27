import { SurveyModel } from '../models/survey'
import { AddSurveyParams } from '../usecases/survey/add-survey'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'answer_1'
    },
    {
      answer: 'answer_2',
      image: 'image_2'
    }],
    date: new Date()
  }
}

export const mockSurveysModel = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        answer: 'answer_1'
      },
      {
        answer: 'answer_2',
        image: 'image_2'
      },
      {
        answer: 'answer_3',
        image: 'image_3'
      }],
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

export const mockSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  },{
    answer: 'other_answer'
  }],
  date: new Date()
})
