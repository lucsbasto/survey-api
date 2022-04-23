import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { mockAccountModel } from '@/domain/test'

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
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(surveyData.id)
      expect(surveyResult.accountId).toEqual(account.id)
      expect(surveyResult.answer).toBe(surveyData.answers[0].answer)
    })

    test('Should update a survey result if its not new', async () => {
      const sut = makeSut()
      const surveyData = await makeSurvey()
      const account = await mockAccountModel()
      const res = await surveyResultCollection.insertOne({
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
      expect(surveyResult.id).toEqual(res.ops[0]._id)
      expect(surveyResult.surveyId).toEqual(surveyData.id)
      expect(surveyResult.accountId).toEqual(account.id)
      expect(surveyResult.answer).toBe(surveyData.answers[1].answer)
    })
  })
})
