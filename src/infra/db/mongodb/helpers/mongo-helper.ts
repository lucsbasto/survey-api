import { MongoClient, Collection } from 'mongodb'
export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  async getCollection (name: string): Promise<Collection> {
    return this.client.db().collection(name)
  },
  map (data: any): any {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id })
  },
  mapArray (array: any[]): any {
    return array.map(i => MongoHelper.map(i))
  }

}
