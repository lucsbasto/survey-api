import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'

let surveyCollection: Collection

let accountCollection: Collection

const makeAdminAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'admin',
    email: 'admin@mail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

const makeUserAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'user',
    email: 'user@mail.com',
    password: '123'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('POST /surveys', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })
  test('Should return 403 on add survey without accessToken', async () => {
    await request(app)
      .post('/api/surveys')
      .send({
        question: 'Question',
        answers: [{
          image: 'http://image-name.com',
          answer: 'Answer 1'
        },
        {
          image: 'http://image2-name.com',
          answer: 'Answer 2'
        }]
      })
      .expect(403)
  })
  test('Should return 204 on add survey with valid accessToken', async () => {
    const accessToken = await makeAdminAccessToken()
    await request(app)
      .post('/api/surveys')
      .set('x-access-token', accessToken)
      .send({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }]
      })
      .expect(204)
  })
  test('Should return 403 on add survey without admin role', async () => {
    const accessToken = await makeUserAccessToken()
    await request(app)
      .post('/api/surveys')
      .set('x-access-token', accessToken)
      .send({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }]
      })
      .expect(403)
  })
})

describe('GET /surveys', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })
  test('Should return 403 on get survey without accessToken', async () => {
    await request(app)
      .get('/api/surveys')
      .expect(403)
  })
  test('Should return 200 on load survey with valid accessToken', async () => {
    const accessToken = await makeUserAccessToken()

    await surveyCollection.insertOne({
      question: 'Question',
      answers: [{
        image: 'http://image-name.com',
        answer: 'Answer 1'
      },
      {
        image: 'http://image2-name.com',
        answer: 'Answer 2'
      }]
    })
    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .expect(200)
  })
  test('Should return 204 on load survey no survey are founded', async () => {
    const accessToken = await makeUserAccessToken()
    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .expect(204)
  })
})
