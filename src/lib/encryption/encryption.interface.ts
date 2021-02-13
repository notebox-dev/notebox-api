export interface Encryption {
  hashSync(plain: string): string
  compareSync(plain: string, encrypted: string): boolean
}
