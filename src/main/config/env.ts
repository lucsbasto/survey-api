export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://admin:admin@cluster0.kmzto.mongodb.net/survey_api?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'secret'
}
