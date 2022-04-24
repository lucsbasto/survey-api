import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export class AddSurveyRepository {
  async add (data: AddSurveyParams): Promise<void> {
    return Promise.resolve(null)
  }
}
