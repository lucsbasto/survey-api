import { badRequest } from './components/bad-request'
import { notFound } from './components/not-found'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  serverError,
  notFound
}
