export class InvalidCredentialError extends Error {
  constructor() {
      super('Invalid credentials.')
  }
}