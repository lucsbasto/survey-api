export interface Encrypter {
  encrypt: (value: string) => Promise<String>
}
