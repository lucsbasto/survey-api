export const saveSurveyResultParamsSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    }
  },
  required: ['answer']
}
