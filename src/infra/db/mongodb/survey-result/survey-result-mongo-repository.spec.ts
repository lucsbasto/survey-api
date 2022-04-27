import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { mockAccountModel } from '@/domain/test'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  const makeFakeSurveyData = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    },{
      answer: 'other_answer'
    }],
    date: new Date()
  })

  const makeSurvey = async (): Promise<SurveyModel> => {
    const surveyData = makeFakeSurveyData()
    const survey = await surveyCollection.insertOne(surveyData)
    return survey.ops && MongoHelper.map(survey.ops[0])
  }

  const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
  }

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const surveyData = await makeSurvey()
      const account = await mockAccountModel()
      const surveyResult = await sut.save({
        surveyId: surveyData.id,
        accountId: account.id,
        answer: surveyData.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(surveyData.id)
      expect(surveyResult.answers[0].answer).toBe(surveyData.answers[0].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })

    test('Should update a survey result if its not new', async () => {
      const sut = makeSut()
      const surveyData = await makeSurvey()
      const account = await mockAccountModel()
      await surveyResultCollection.insertOne({
        surveyId: surveyData.id,
        accountId: account.id,
        answer: surveyData.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await sut.save({
        surveyId: surveyData.id,
        accountId: account.id,
        answer: surveyData.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.answers[0].answer).toBe(surveyData.answers[1].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })
  })
})
