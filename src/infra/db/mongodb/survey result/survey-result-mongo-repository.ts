import { MongoHelper } from '../helpers/mongo-helper'
import {
  SaveSurveyResultRepository,
  SurveyResultModel,
  SaveSurveyResultModel
} from '@/data/usecases/save-survey-result/db-save-survey-result-protocols'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const surveyResult = await surveyResultCollection.findOneAndUpdate({
      accountId: data.accountId,
      surveyId: data.surveyId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return surveyResult && MongoHelper.map(surveyResult.value)
  }
}