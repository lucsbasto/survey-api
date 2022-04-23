import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { mockSurveyParams } from '@/domain/test'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }
  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      const surveyData = mockSurveyParams()
      await sut.add(surveyData)
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([
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
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })
    test('Should load an empty list if there is no data in survey collection', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const res = await surveyCollection.insertOne({
        id: 'any_id',
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }],
        date: new Date()
      })
      const sut = makeSut()
      const survey = await sut.loadById(res.insertedId)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
      expect(survey.question).toBe('any_question')
    })
  })
})
