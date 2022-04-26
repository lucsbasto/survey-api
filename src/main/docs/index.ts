import { badRequest, unauthorized, serverError, notFound } from './components'
import { loginPath, signUpPath } from './paths'
import { surveyPath } from './paths/survey-path'
import {
  apiKeyAuthSchema,
  accountSchema,
  errorSchema,
  loginParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  signUpParamsSchema
} from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API',
    description: 'API do Curso do Manguinho de NodeJs, Typescript, TDD, Clean Architecture e SOLID',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    { name: 'Login' },
    { name: 'Enquete' }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    notFound
  }
}
