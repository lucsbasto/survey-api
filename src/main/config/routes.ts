import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const routePath = path.join(__dirname,'..', 'routes')
  readdirSync(routePath).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
