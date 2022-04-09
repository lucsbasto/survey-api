import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'

let surveyCollection: Collection

let accountCollection: Collection

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
    const res = await accountCollection.insertOne({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      role: 'admin'
    })
    const id = res.ops[0]._id
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken
      }
    })
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
})
