export class UpdateIssueDateRequest {
    constructor( 
      public readonly id: number,
      public readonly issue_date: Date
    ) {}
  }
  