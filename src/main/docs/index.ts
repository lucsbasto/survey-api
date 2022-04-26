import components from './components'
import paths from './paths'
import schemas from './schemas'

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
  paths,
  schemas,
  components
}
