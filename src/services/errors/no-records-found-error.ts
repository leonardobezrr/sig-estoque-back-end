export class NoRecordsFoundError extends Error{
  constructor(){
      super('No records found.')
  }
}