import { Collection, ObjectId } from 'mongodb'
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

  const mockSurveyData = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer_1'
    },{
      answer: 'any_answer_2'
    },{
      answer: 'any_answer_3'
    }],
    date: new Date()
  })

  const makeSurvey = async (): Promise<SurveyModel> => {
    const surveyData = mockSurveyData()
    const survey = await surveyCollection.insertOne(surveyData)
    return survey.ops && MongoHelper.map(survey.ops[0])
  }
  const makeAccount = async (): Promise<SurveyModel> => {
    const accountData = mockAccountModel()
    const account = await accountCollection.insertOne(accountData)
    return account.ops && MongoHelper.map(account.ops[0])
  }

  const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
  }

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const surveyData = await makeSurvey()
      const account = await makeAccount()
      await sut.save({
        surveyId: surveyData.id,
        accountId: account.id,
        answer: surveyData.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: surveyData.id,
        accountId: account.id
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update a survey result if its not new', async () => {
      const sut = makeSut()
      const surveyData = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertOne({
        surveyId: surveyData.id,
        accountId: account.id,
        answer: surveyData.answers[1].answer,
        date: new Date()
      })
      await sut.save({
        surveyId: surveyData.id,
        accountId: account.id,
        answer: surveyData.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.find({
        surveyId: surveyData.id,
        accountId: account.id
      }).toArray()
      expect(surveyResult.length).toBe(1)
    })
  })
  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const sut = makeSut()
      const surveyData = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(surveyData.id),
        accountId: new ObjectId(account.id),
        answer: surveyData.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(surveyData.id),
        accountId: new ObjectId(account.id),
        answer: surveyData.answers[0].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(surveyData.id),
        accountId: new ObjectId(account.id),
        answer: surveyData.answers[1].answer,
        date: new Date()
      },
      {
        surveyId: new ObjectId(surveyData.id),
        accountId: new ObjectId(account.id),
        answer: surveyData.answers[1].answer,
        date: new Date()
      }
      ])
      const surveyResult = await sut.loadBySurveyId(surveyData.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(surveyData.id.toString())
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[1].count).toBe(2)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[2].count).toBe(0)
      expect(surveyResult.answers[2].percent).toBe(0)
    })
  })
})
