export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://admin:AQ8QoDttMimVyLML@cluster0.kmzto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'secret'
}
