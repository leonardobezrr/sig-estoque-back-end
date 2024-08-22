export class InactiveError extends Error {
    constructor(){
        super('Product does not exist or is inactive')
    }
  }