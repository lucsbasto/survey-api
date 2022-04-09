export interface Decrypter {
  decrypt: (id: string) => Promise<string>
}
