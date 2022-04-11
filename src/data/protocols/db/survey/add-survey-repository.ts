import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export class AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
