import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { AccountModel } from '../../../../domain/models/account'
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

  const makeFakeAccount = async (): Promise<AccountModel> => {
    const account = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    return account.ops && MongoHelper.map(account.ops[0])
  }

  const makeFakeSurveyData = (): AddSurveyModel => ({
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
      const account = await makeFakeAccount()
      const surveyResult = await sut.save({
        surveyId: surveyData.id,
        accountId: account.id,
        answer: surveyData.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.surveyId).toStrictEqual(surveyData.id)
      expect(surveyResult.accountId).toStrictEqual(account.id)
      expect(surveyResult.answer).toBe(surveyData.answers[0].answer)
    })
  })
})
